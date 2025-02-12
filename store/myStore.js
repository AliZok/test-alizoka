const myStore = reactive({
  // the list of days with informations
  propertyDays: {
    bahman: {
      1: {
        reserved: true,
        lastMomentDiscount: 10
      },
      2: {
        reserved: false,
        discount: 25
      },
      8: {
        lastMomentDiscount: 10,
        instantDiscount: 30,
        lastMomentDiscount: 10
      },
      11: {
        reserved: true
      },
      12: {
        reserved: true
      },
      13: {
        reserved: true
      }
    },
    dey: {
      4: {
        reserved: true,
        discount: 8
      },
      5: {
        lastMomentDiscount: true
      },
      6: {
        lastMomentDiscount: true
      }
    }
  }
})

export default myStore
