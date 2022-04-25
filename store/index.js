// Default Nuxt store

export const state = () => ({

  wphMin: 390,
  wphMax: 620,
  midpoint: 720

})

export const mutations = {

  set(state, values) {
    Object.assign(state, values)
  }

}