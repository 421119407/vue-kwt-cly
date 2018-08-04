const app = {
  state: {
    barEffect: {
      open: true,
      withoutAnimation: false
    }
  },
  mutations: {
    TOGGLE_BAREFFECT: state => {
      state.barEffect.open = !state.barEffect.open
      state.barEffect.withoutAnimation = false
    }
  },
  actions: {
    ToggleBarEffect: ({ commit }) => {
      commit('TOGGLE_BAREFFECT')
    }
  }
}

export default app
