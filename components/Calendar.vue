<template>
  <div class="bg-[#e6fff7] px-3 py-2 rounded-2xl" dir="rtl">
    <!-- Days of the Week -->
    <div class="mb-4 text-center">
      <div class="flex justify-between" dir="ltr">
        <div @click="goPrevMonth()">
          <div
            class="flex items-center gap-2 my-delay w-[40px] h-[30px] text-[10px] hover:text-emerald-500 hover:text-[12px] cursor-pointer">
            <i class='fa-angle-left fa'></i>
            <div class="pt-1">
              {{ shamsiMonths[indexMonthOfYear - 2]?.name }}
            </div>
          </div>
        </div>
        <div @click="goNextMonth()"
          class="flex items-center gap-2 my-delay w-[40px] h-[30px] text-[10px] hover:text-emerald-500 hover:text-[12px] cursor-pointer">
          <div class="pt-1">
            {{ shamsiMonths[indexMonthOfYear + 1]?.name }}
          </div>
          <i class='fa-angle-right fa'></i>
        </div>
      </div>
    </div>

    <!-- Days of the Month -->
    <div class="block md:flex justify-center gap-6 text-gray-700">
      <div class="mb-8">
        <div class="mb-4 font-bold text-lime-500 text-center">
          {{ shamsiMonths[indexMonthOfYear].name }}
        </div>
        <div class="text-center days-of-week" dir="ltr">
          <span v-for="day in daysssOfWeek" :key="day">{{ day }}</span>
        </div>
        <div class="days-grid"  dir="ltr">
          <!-- empty characters -->
          <span v-for="empty in emptyDays" :key="empty">
          </span>
          <!-- start days characters -->

          <span v-for="day in mainListDaysInMonth" :key="day"
            class="relative flex flex-col justify-between px-1 py-1 rounded-lg w-[45px] md:w-[48px] min-h-[50px] text-center day"
            :class="[{ 'opacity-50 bg-gray-400': day.reserved, 'hover:bg-[#b3f9e9] hover:scale-[1.08] cursor-pointer bg-white': !day.reserved, '!bg-lime-300 !text-gray-500 font-bold !text-[22px]': day.isToday }]">
            <div>{{ day.day }}</div>

            <!-- <div class="text-[10px] text-white" dir="ltr">
              <div v-if="day.discount" class="bg-rose-500 mb-1 px-2 py-[2px] rounded-2xl text-[9px]">
                {{ day.discount }} %
              </div>
              <div v-if="day.instantDiscount" class="bg-pink-400 px-2 py-[2px] rounded-2xl text-[9px]">{{
                day.instantDiscount }} %
              </div>
            </div> -->
            <div class="flex justify-center items-center gap-1 text-[10px] text-white" dir="ltr">
              <div v-if="day.discount" class="bg-rose-500 px-[4px] pt-[2px] rounded-xl">
                {{ day.discount }}
                %
              </div>
              <div v-if="day.instantDiscount" class="bg-pink-400 px-[4px] pt-[2px] rounded-xl">{{ day.instantDiscount }}
                %
              </div>
            </div>
            <div v-if="day.lastMomentDiscount && !day.reserved" class="top-1 right-0 absolute px-1 rounded-full"> <i
                class="text-amber-400 fa fa-bolt"></i>
              <Tooltip class="my-tooltip">
                دارای تخفیف لحظه آخری
              </Tooltip>
            </div>
          </span>
        </div>
      </div>
      <div>
        <div class="mb-4 font-bold text-lime-500 text-center">
          {{ shamsiMonths[indexMonthOfYearPrev].name }}
        </div>
        <div class="text-center days-of-week" dir="ltr">
          <span v-for="day in daysssOfWeek" :key="day">{{ day }}</span>
        </div>
        <div class="days-grid" dir="ltr">
          <!-- empty characters -->
          <span v-for="empty in emptyDaysPrev" :key="empty">
          </span>
          <!-- start days characters -->
          <span v-for="day in mainListDaysInMonthPrev" :key="day"
            class="relative px-1 py-1 rounded-lg w-[45px] md:w-[48px] min-h-[50px] text-center day"
            :class="[{ 'opacity-50 bg-gray-400': day.reserved, 'hover:bg-[#b3f9e9] cursor-pointer hover:scale-[1.09]  bg-white': !day.reserved, '!bg-lime-300 !text-gray-500 !text-[22px] font-bold': day.isToday }]">
            <div>{{ day.day }}</div>

            <div class="flex justify-center items-center gap-1 text-[10px] text-white" dir="ltr">
              <div v-if="day.discount" class="bg-rose-500 px-2 py-[2px] rounded-2xl">
                {{ day.discount }}
                %
              </div>
              <div v-if="day.instantDiscount" class="bg-pink-400 px-2 py-[2px] rounded-2xl">{{ day.instantDiscount }} %
              </div>
            </div>
            <div v-if="day.lastMomentDiscount && !day.reserved" class="top-1 right-0 absolute px-1 rounded-full"> <i
                class="text-amber-400 fa fa-bolt"></i>
              <Tooltip class="my-tooltip">
                دارای تخفیف لحظه آخری
              </Tooltip>
            </div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toJalaali, jalaaliToDateObject, isLeapJalaaliYear, jalaaliMonthLength } from 'jalaali-js';
import myStore from '~/store/myStore.js'

// import the list of days properties
const propertyDaysParse = Object.entries(myStore.propertyDays)

const daysssOfWeek = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

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
const emptyDaysPrev = ref(0)
const indexMonthOfYear = ref(0)
const indexMonthOfYearPrev = ref(0)
const mainListDaysInMonth = ref([])
const mainListDaysInMonthPrev = ref([])
const toDay = ref({})
const newDate = new Date();
const showingMasterDateJalali = ref({});
const showingMasterDateJalaliPrev = ref({});
const monthNumberBefore = ref(0)

toDay.value = toJalaali(newDate)

function convertToShamsiDayNumber(gregorianDay) {
  return (gregorianDay + 1) % 7;
}

const createshowingDate = (numberOfNextMonth) => {
  const showingMasterDate = new Date(newDate);
  const showingMasterDatePrev = new Date(newDate);

  monthNumberBefore.value = monthNumberBefore.value + numberOfNextMonth

  showingMasterDate.setMonth(showingMasterDate.getMonth() + monthNumberBefore.value);
  showingMasterDatePrev.setMonth(showingMasterDatePrev.getMonth() + monthNumberBefore.value - 1);

  showingMasterDateJalali.value = toJalaali(showingMasterDate)
  showingMasterDateJalaliPrev.value = toJalaali(showingMasterDatePrev)

  const dateObject = jalaaliToDateObject(showingMasterDateJalali.value.jy, showingMasterDateJalali.value.jm, 1);
  const dateObjectPrev = jalaaliToDateObject(showingMasterDateJalaliPrev.value.jy, showingMasterDateJalaliPrev.value.jm, 1);

  emptyDays.value = convertToShamsiDayNumber(dateObject.getDay());
  emptyDaysPrev.value = convertToShamsiDayNumber(dateObjectPrev.getDay());

  indexMonthOfYear.value = getShamsiMonthNumber(showingMasterDate);
  indexMonthOfYearPrev.value = indexMonthOfYear.value - 1

  // if is leap year, Esfand have to be 30 days 
  shamsiMonths.value[11].days = isLeapShowingYear.value ? 30 : 29

  calculateDays()
}



const calculateDays = () => {

  const showingMonthEn = shamsiMonths.value[showingMasterDateJalali.value.jm - 1].enName
  const showingMonthEnPrev = shamsiMonths.value[showingMasterDateJalaliPrev.value.jm - 1].enName

  const showingMonthDays = shamsiMonths.value[showingMasterDateJalali.value.jm - 1].days
  const showingMonthDaysPrev = shamsiMonths.value[showingMasterDateJalaliPrev.value.jm - 1].days

  let parseProperties = []
  let parsePropertiesPrev = []

  propertyDaysParse.forEach((itemMonth) => {

    if (showingMonthEn == itemMonth[0]) {
      parseProperties = Object.entries(itemMonth[1])
    }

    if (showingMonthEnPrev == itemMonth[0]) {
      parsePropertiesPrev = Object.entries(itemMonth[1])
    }
  })

  mainListDaysInMonth.value = []
  mainListDaysInMonthPrev.value = []

  for (let counter = 1; counter <= showingMonthDays; counter++) {
    let oneDayList = { day: counter }

    parseProperties.forEach((itemProperty) => {
      if (itemProperty[0] == counter) {
        oneDayList = { ...oneDayList, ...itemProperty[1] }
      }
    })

    mainListDaysInMonth.value.push(oneDayList)
  }

  for (let counter = 1; counter <= showingMonthDaysPrev; counter++) {
    let oneDayList = { day: counter }

    parsePropertiesPrev.forEach((itemProperty) => {
      if (itemProperty[0] == counter) {
        oneDayList = { ...oneDayList, ...itemProperty[1] }
      }
    })

    mainListDaysInMonthPrev.value.push(oneDayList)
  }

  if (showingMasterDateJalali.value.jm == toDay.value.jm && showingMasterDateJalali.value.jy == toDay.value.jy) {
    mainListDaysInMonth.value[toDay.value.jd - 1].isToday = true
  }

  if (showingMasterDateJalaliPrev.value.jm == toDay.value.jm && showingMasterDateJalaliPrev.value.jy == toDay.value.jy) {
    mainListDaysInMonthPrev.value[toDay.value.jd - 1].isToday = true
  }

};


function getShamsiMonthNumber(gregorianDate) {
  const shamsiDate = toJalaali(
    gregorianDate.getFullYear(),
    gregorianDate.getMonth(),
    gregorianDate.getDate()
  );

  return shamsiDate.jm;
}

const goNextMonth = () => {
  createshowingDate(1)
}

const goPrevMonth = () => {
  createshowingDate(-1)
}

const isLeapShowingYear = computed(() => isLeapJalaaliYear(showingMasterDateJalali.value?.jy))

onMounted(() => {
  createshowingDate(0)
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
  gap: 3px;
}

.day {
  box-shadow: 2px 2px 5px #d7dad9;
  transition: 0.3s;
}

.my-tooltip {
  display: none;
}

.day:hover .my-tooltip {
  display: block;
  z-index: 1000 !important;
}
</style>