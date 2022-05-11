// Default Nuxt store

export const state = () => ({

  wphMin: 300,
  wphMax: 900,
  midpoint: 800,
  hourlyRate: 200,

})

export const mutations = {

  set(state, values) {
    Object.assign(state, values)
  }

}