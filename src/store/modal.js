const modal = {
  state: {
    show: false,
    title: 'asdf',
    message: 'foo',
    footer: ''
  },
  mutations: {
    showModal: (state, { title, message }) => {
      console.log('[modal] showModal', title)
      state.title = title
      state.message = message
      state.show = true
    },
    hideModal: (state) => {
      console.log('[modal] hideModal')
      state.title = ''
      state.message = ''
      state.show = false
    }
  }
}

export default modal
