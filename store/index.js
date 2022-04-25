// Default Nuxt store

export const state = () => ({

  wphMin: 340,
  wphMax: 610,
  midpoint: 440,
  hourlyRate: 170,

})

export const mutations = {

  set(state, values) {
    Object.assign(state, values)
  }

}