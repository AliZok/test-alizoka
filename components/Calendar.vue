<template>
  <div dir="rtl">
    <!-- Days of the Week -->
    <div class="text-center mb-8">
      <div class="flex justify-between" dir="ltr">
        <div @click="goPrevMonth()">
          قبلی
        </div>
        <div>
          {{ shamsiMonths[indexMonthOfYear].name }}
        </div>
        <div @click="goNextMonth()">بعدی</div>
      </div>
    </div>



    <!-- Days of the Month -->
    <div class="flex gap-4">
      <div>
        <div class="days-of-week text-center">
          <span v-for="day in daysssOfWeek" :key="day">{{ day }}</span>
        </div>
        <div class="days-grid">

          <!-- empty characters -->
          <span v-for="day in emptyDays" :key="day">
          </span>

          <!-- start days characters -->
          <span v-for="day in mainListDaysInMonth" :key="day" class="text-center relative day"
            :class="[{ 'opacity-50 bg-gray-400': day.reserved, 'hover:bg-[#b3f9e9]': !day.reserved, 'bg-lime-300': day.isToday }]">
            <div>{{ day.day }}</div>

            <div class="flex justify-center items-center text-[10px] gap-1 text-white" dir="ltr">
              <div v-if="day.discount" class="px-2 py-[2px] bg-rose-500 rounded-2xl ">
                {{ day.discount }}
                %
              </div>
              <div v-if="day.instantDiscount" class="px-2 py-[2px] bg-pink-400 rounded-2xl">{{ day.instantDiscount }} %
              </div>
            </div>
            <div v-if="day.lastMomentDiscount" class="absolute px-1 right-1 top-1 bg-green-300 rounded-full">a</div>
          </span>

        </div>
      </div>

      <div>
        <div class="days-of-week text-center">
          <span v-for="day in daysssOfWeek" :key="day">{{ day }}</span>
        </div>
        <div class="days-grid">

          <!-- empty characters -->
          <span v-for="day in emptyDays" :key="day">
          </span>

          <!-- start days characters -->
          <span v-for="day in mainListDaysInMonth" :key="day" class="text-center relative day"
            :class="[{ 'opacity-50 bg-gray-400': day.reserved, 'hover:bg-[#b3f9e9]': !day.reserved, 'bg-lime-300': day.isToday }]">
            <div>{{ day.day }}</div>

            <div class="flex justify-center items-center text-[10px] gap-1 text-white" dir="ltr">
              <div v-if="day.discount" class="px-2 py-[2px] bg-rose-500 rounded-2xl ">
                {{ day.discount }}
                %
              </div>
              <div v-if="day.instantDiscount" class="px-2 py-[2px] bg-pink-400 rounded-2xl">{{ day.instantDiscount }} %
              </div>
            </div>
            <div v-if="day.lastMomentDiscount" class="absolute px-1 right-1 top-1 bg-green-300 rounded-full">a</div>
          </span>

        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { toJalaali, jalaaliToDateObject, isLeapJalaaliYear, jalaaliMonthLength } from 'jalaali-js';
const propertyDays = ref({
  bahman: {
    1: {
      reserved: true,
      discount: 25,
      lastMomentDiscount: 10,

    },
    2: {
      reserved: false,
      discount: 25,
      instantDiscount: 30,
    },
    8: {
      discount: 25,
      lastMomentDiscount: 10,
    },
  },
  dey: {
    4: {
      reserved: true,
      discount: 8,
      lastMomentDiscount: 10,
      instantDiscount: 30,
    },
  },
})


const daysssOfWeek = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج',];

const shamsiMonths = ref([
  { name: 'فروردین', enName: 'farvardin', days: 31 },
  { name: 'اردیبهشت', enName: 'ordibehesht', days: 31 },
  { name: 'خرداد', enName: 'khordad', days: 31 },
  { name: 'تیر', enName: 'tir', days: 31 },
  { name: 'مرداد', enName: 'mordad', days: 31 },
  { name: 'شهریور', enName: 'shahrivar', days: 31 },
  { name: 'مهر', enName: 'mehr', days: 30 },
  { name: 'آبان', enName: 'aban', days: 30 },
  { name: 'آذر', enName: 'azar', days: 30 },
  { name: 'دی', enName: 'dey', days: 30 },
  { name: 'بهمن', enName: 'bahman', days: 30 },
  { name: 'اسفند', enName: 'esfand', days: 29 } // 29 or 30 depending on leap year
]);

const emptyDays = ref(0)
const indexMonthOfYear = ref(0)
const mainListDaysInMonth = ref([])
// GET TODAY 
const toDay = ref({})
const newDate = new Date();
const showingDate = new Date(newDate);
const showingDateJalali = ref({});

toDay.value = toJalaali(newDate)

const createShowingDate = (numberOfNextMonth) => {


  showingDate.setMonth(showingDate.getMonth() + numberOfNextMonth);
  showingDateJalali.value = toJalaali(showingDate)

  const dateObject = jalaaliToDateObject(showingDateJalali.value.jy, showingDateJalali.value.jm, 1);

  emptyDays.value = convertToShamsiDayNumber(dateObject.getDay());
  indexMonthOfYear.value = getShamsiMonthNumber(showingDate);

  // if is leap year, Esfand have to be 30 days 
  shamsiMonths.value[11].days = isLeapShowingYear.value ? 30 : 29


  calculateDays()
}


function convertToShamsiDayNumber(gregorianDay) {
  return (gregorianDay + 1) % 7;
}




const calculateDays = () => {
  const propertyDaysEnt = Object.entries(propertyDays.value)
  const showingMonthEn = shamsiMonths.value[showingDateJalali.value.jm - 1].enName
  const showingMonthDays = shamsiMonths.value[showingDateJalali.value.jm - 1].days
  let parseProperties = []


  propertyDaysEnt.forEach((itemMonth) => {
    if (showingMonthEn == itemMonth[0]) {
      parseProperties = Object.entries(itemMonth[1])
      console.log("hhhhhhhhhhhhhhhhhhhh", parseProperties)
    }
  })

  mainListDaysInMonth.value = []
  for (let counter = 1; counter <= showingMonthDays; counter++) {
    let oneDayList = { day: counter }

    parseProperties.forEach((itemProperty) => {
      if (itemProperty[0] == counter) {
        oneDayList = { ...oneDayList, ...itemProperty[1] }
      }
    })
    mainListDaysInMonth.value.push(oneDayList)
  }

  if (showingDateJalali.value.jm == toDay.value.jm && showingDateJalali.value.jy == toDay.value.jy) {
    mainListDaysInMonth.value[toDay.value.jd - 1].isToday = true
  }

  console.log("ffffffffffffface", mainListDaysInMonth.value)






};

// =================================



function getShamsiMonthNumber(gregorianDate) {
  const shamsiDate = toJalaali(
    gregorianDate.getFullYear(),
    gregorianDate.getMonth(),
    gregorianDate.getDate()
  );

  return shamsiDate.jm;
}

//========================= global functions

const goNextMonth = () => {
  createShowingDate(1)
}

const goPrevMonth = () => {
  createShowingDate(-1)
}

const isLeapShowingYear = computed(() => isLeapJalaaliYear(showingDateJalali.value?.jy))
// =================================


onMounted(() => {
  createShowingDate(0)



  console.log("qqqqqqqqqqqqqqqqqqq", isLeapShowingYear.value)
})
</script>

<style scoped>
.days-of-week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  margin-bottom: 10px;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.days-grid span {
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
}

.day {
  box-shadow: 2px 2px 5px #d7dad9;
}
</style>