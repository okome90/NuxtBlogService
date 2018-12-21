import moment from '~/plugins/moment'

export const state = () => ({
  posts: []
})

export const getters = {
  posts: state => state.posts.map((post) => Object.assign({ likes: [] }, post))
}

export const mutations = {
  addPost(state, { post }) {
    state.posts.push(post)
  },
  updatePost(state, { post }) {
    state.posts = state.posts.map((p) => (p.id === post.id ? post : p))
  },
  clearPosts(state) {
    state.posts = []
  }
}

export const actions = {
  async fetchPost({ commit }, { id }) {
    const post = await this.$axios.$get(`/posts/${id}.json`)
    commit('addPost', { post: { ...post, id }})
  },
  async fetchPosts({ commit }) {
    const posts = await this.$axios.$get(`/posts.json`)
    commit('clearPosts')
    Object.entries(posts) // jsonObject => [key, value]
      .reverse() // 古い順に並び替え
      .forEach(([id, content]) => // id = key content = value
        commit('addPost', {
          post: {
            id,
            ...content // contentには複数要素が含まれるためspread operator
          }
        })
      )
  },
  async publishPost({ commit }, { payload }) {
    const user = await this.$axios.$get(`/users/${payload.user.id}.json`)
    const post_id = (await this.$axios.$post('/posts.json', payload)).name
    const created_at = moment().format() // 現在日時(YYYY-MM-ddThh:mm:ss)
    const post = { id: post_id, ...payload, created_at }
    const putData = { id: post_id, ...payload, created_at }
    delete putData.user
    await this.$axios.$put(`/users/${user.id}/posts.json`, [
      ...(user.posts || []),
      putData
    ])
    commit('addPost', { post })
  },
  async addLikeToPost({ commit }, { user, post }) {
    post.likes.push({
      created_at: moment().format(),
      user_id: user.id,
      post_id: post.id
    })
    const newPost = await this.$axios.$put(`/posts/${post.id}.json`, post)
    commit('updatePost', { post: newPost })
  },
  async addUnlikeToPost({ commit }, { user, post }) {
    // 削除対象のいいねを除いた配列を生成する
    // 特定の投稿に対するいいねの削除であることは明白なため、post_idの指定は不要
    post.likes = post.likes.filter(like => like.user_id !== user.id) || []
    const newPost = await this.$axios.$put(`/posts/${post.id}.json`, post)
    commit('updatePost', { post: newPost })
  }
}