import Fire from "../../firebase";

import { addDays, subDays, eachDayOfInterval } from "date-fns";
import moment from "moment";
import AsyncStorage from "@react-native-community/async-storage";

const SET_DAY_OF_WEEK = "statisticsScreen/SET_DAY_OF_WEEK";
const SET_DAYS_OF_MONTH = "statisticsScreen/SET_DAYS_OF_MONTH";
const SET_PREV_ACTIVE_DATE = "statisticsScreen/SET_PREV_ACTIVE_DATE";
const SET_NEXT_ACTIVE_DATE = "statisticsScreen/SET_NEXT_ACTIVE_DATE";
const SET_DREAMS = "statisticsScreen/SET_DREAMS";
const SET_DREAMS_YEST = "statisticsScreen/SET_DREAMS_YEST";
const SET_LOADING = "statisticsScreen/SET_LOADING";
const SET_DREAM_COLOR_INDICATOR = "statisticsScreen/SET_DREAM_COLOR_INDICATOR";
const SET_STATISTIC_COLOR_INDICATOR =
  "statisticsScreen/SET_STATISTIC_COLOR_INDICATOR";
const SET_GESTURE = "statisticsScreen/SET_GESTURE";
const SET_DREAMS_MONTH = "statisticsScreen/SET_DREAMS_MONTH";
const SET_DREAMS_TWOWEEKS = "statisticsScreen/SET_DREAMS_TWOWEEKS";
const SET_DREAMS_THREEWEEKS = "statisticsScreen/SET_DREAMS_THREEWEEKS";
const SET_DREAM_COLOR_INDICATOR_ABOVE =
  "statisticsScreen/SET_DREAM_COLOR_INDICATOR_ABOVE";
const SET_STATISTIC_COLOR_INDICATOR_ABOVE =
  "statisticsScreen/SET_STATISTIC_COLOR_INDICATOR_ABOVE";

const _calcEndDay = (date, type) => {
  return type
    ? type === "prev"
      ? subDays(date, 6)
      : addDays(date, 6)
    : subDays(date, 6);
};
const _calcEndTwoWeeks = (date, type) => {
  return type
    ? type === "prev"
      ? subDays(date, 13)
      : addDays(date, 13)
    : subDays(date, 13);
};
const _calcEndThreeWeeks = (date, type) => {
  return type
    ? type === "prev"
      ? subDays(date, 20)
      : addDays(date, 20)
    : subDays(date, 20);
};
const _calcEndMonth = (date, type) => {
  return type
    ? type === "prev"
      ? subDays(date, 29)
      : addDays(date, 29)
    : subDays(date, 29);
};

let initialState = {
  daysOfMonth: [],
  weeks: [],
  prevActiveDate: moment().local(),
  nextActiveDate: moment().local(),
  dreams: [],
  loading: false,
  colorDreamIndicator: false,
  colorStatisticIndicator: false,
  colorDreamIndicatorAbove: false,
  colorStatisticIndicatorAbove: false,
  gesture: false,
  dreamsTwoWeeks: [],
  dreamsThreeWeeks: [],
  dreamsMonth: [],
};

export const statisticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DAY_OF_WEEK: {
      return {
        ...state,
        weeks: action.weeks,
      };
    }
    case SET_DAYS_OF_MONTH: {
      return {
        ...state,
        daysOfMonth: action.daysOfMonth,
      };
    }
    case SET_PREV_ACTIVE_DATE:
      return {
        ...state,
        prevActiveDate: action.activeDate,
      };
    case SET_NEXT_ACTIVE_DATE:
      return {
        ...state,
        nextActiveDate: action.activeDate,
      };
    case SET_DREAMS:
      return {
        ...state,
        dreams: action.dreams,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case SET_DREAM_COLOR_INDICATOR:
      return {
        ...state,
        colorDreamIndicator: action.indicator,
      };
    case SET_STATISTIC_COLOR_INDICATOR:
      return {
        ...state,
        colorStatisticIndicator: action.indicator,
      };
    case SET_DREAM_COLOR_INDICATOR_ABOVE:
      return {
        ...state,
        colorDreamIndicatorAbove: action.indicator,
      };
    case SET_STATISTIC_COLOR_INDICATOR_ABOVE:
      return {
        ...state,
        colorStatisticIndicatorAbove: action.indicator,
      };
    case SET_GESTURE:
      return {
        ...state,
        gesture: action.indicator,
      };
    case SET_DREAMS_MONTH:
      return {
        ...state,
        dreamsMonth: action.dreams,
      };
    case SET_DREAMS_TWOWEEKS:
      return {
        ...state,
        dreamsTwoWeeks: action.dreams,
      };
    case SET_DREAMS_THREEWEEKS:
      return {
        ...state,
        dreamsThreeWeeks: action.dreams,
      };
    default:
      return state;
  }
};

export const setWeeks = (weeks) => ({ type: SET_DAY_OF_WEEK, weeks });
export const setDaysOfMonth = (daysOfMonth) => ({
  type: SET_DAYS_OF_MONTH,
  daysOfMonth,
});
export const setPrevActiveDate = (activeDate) => ({
  type: SET_PREV_ACTIVE_DATE,
  activeDate,
});
export const setNextActiveDate = (activeDate) => ({
  type: SET_NEXT_ACTIVE_DATE,
  activeDate,
});
export const setDreams = (dreams) => ({ type: SET_DREAMS, dreams });
export const setLoading = (loading) => ({ type: SET_LOADING, loading });
export const setDreamColorIndicator = (indicator) => ({
  type: SET_DREAM_COLOR_INDICATOR,
  indicator,
});
export const setStatisticColorIndicator = (indicator) => ({
  type: SET_STATISTIC_COLOR_INDICATOR,
  indicator,
});
export const setGesture = (indicator) => ({ type: SET_GESTURE, indicator });
export const setDreamsMonth = (dreams) => ({ type: SET_DREAMS_MONTH, dreams });
export const setDreamsTwoWeeks = (dreams) => ({
  type: SET_DREAMS_TWOWEEKS,
  dreams,
});
export const setDreamsThreeWeeks = (dreams) => ({
  type: SET_DREAMS_THREEWEEKS,
  dreams,
});
export const setDreamColorIndicatorAbove = (indicator) => ({
  type: SET_DREAM_COLOR_INDICATOR_ABOVE,
  indicator,
});
export const setStatisticColorIndicatorAbove = (indicator) => ({
  type: SET_STATISTIC_COLOR_INDICATOR_ABOVE,
  indicator,
});

export const setWeeksTC = (endDay, type) => (dispatch) => {
  dispatch(setLoading(true));

  const startDate = endDay.toDate();
  const endDate = _calcEndDay(startDate, type);

  let daysOfWeek;

  switch (type) {
    case "prev":
      {
        daysOfWeek = eachDayOfInterval({ start: endDate, end: startDate });
      }
      break;
    case "next":
      {
        daysOfWeek = eachDayOfInterval({ start: startDate, end: endDate });
      }
      break;
    default: {
      daysOfWeek = eachDayOfInterval({ start: endDate, end: startDate });
    }
  }

  const prevActiveDate = moment(daysOfWeek[0]);
  const nextActiveDate = moment(daysOfWeek[daysOfWeek.length - 1]);

  dispatch(setPrevActiveDate(prevActiveDate));
  dispatch(setNextActiveDate(nextActiveDate));
  dispatch(setWeeks(daysOfWeek));
  dispatch(setDreamsTC(daysOfWeek));

  dispatch(setMonthTC(endDay));
};

export const setMonthTC = (endDay) => (dispatch) => {
  const startDate = endDay.toDate();
  let daysOfMonth = eachDayOfInterval({
    start: _calcEndMonth(startDate),
    end: startDate,
  }).reverse();
  let daysOfTwoWeeks = eachDayOfInterval({
    start: _calcEndTwoWeeks(startDate),
    end: startDate,
  });
  let daysOfThreeWeeks = eachDayOfInterval({
    start: _calcEndThreeWeeks(startDate),
    end: startDate,
  });

  dispatch(setDaysOfMonth(daysOfMonth));
  dispatch(setDreamsMonthTC(daysOfMonth));
  dispatch(setDreamsTwoWeeksTC(daysOfTwoWeeks));
  dispatch(setDreamsThreeWeeksTC(daysOfThreeWeeks));
};

export const setDreamsTC = (days) => async (dispatch) => {
  const dates = days.map((day) => moment(day));

  const response = await Promise.all(
    dates.map((date) => {
      return Fire.getOnce(date);
    })
  );

  const dreams = response.map((dream) => ({ dream: dream.dreams }));

  dispatch(setDreams(dreams));
  dispatch(setLoading(false));
};

export const setDreamsMonthTC = (days) => async (dispatch) => {
  const dates = days.map((day) => moment(day));
  const response = await Promise.all(
    dates.map((date) => {
      return Fire.getOnce(date);
    })
  );
  const dreams = response.map((dream) => ({ dream: dream.dreams }));
  dispatch(setDreamsMonth(dreams.slice(-30)));
};
export const setDreamsTwoWeeksTC = (days) => async (dispatch) => {
  const dates = days.map((day) => moment(day));
  const response = await Promise.all(
    dates.map((date) => {
      return Fire.getOnce(date);
    })
  );
  const dreams = response.map((dream) => ({ dream: dream.dreams }));
  dispatch(setDreamsTwoWeeks(dreams));
};
export const setDreamsThreeWeeksTC = (days) => async (dispatch) => {
  const dates = days.map((day) => moment(day));
  const response = await Promise.all(
    dates.map((date) => {
      return Fire.getOnce(date);
    })
  );
  const dreams = response.map((dream) => ({ dream: dream.dreams }));
  dispatch(setDreamsThreeWeeks(dreams));
};

export const setDreamColorStatistic = (indicator) => async (
  dispatch,
  getState
) => {
  await AsyncStorage.setItem(`@dreamColorStatistic`, JSON.stringify(indicator));

  dispatch(setDreamColorIndicator(indicator));
};

export const setStatisticColorStatistic = (indicator) => async (
  dispatch,
  getState
) => {
  await AsyncStorage.setItem(
    `@statisticColorStatistic`,
    JSON.stringify(indicator)
  );

  dispatch(setStatisticColorIndicator(indicator));
};

export const setGestureActive = (indicator) => async (dispatch, getState) => {
  await AsyncStorage.setItem(`@gestureActive`, JSON.stringify(indicator));

  dispatch(setGesture(indicator));
};

export const setDreamColorStatisticAbove = (indicator) => async (
  dispatch,
  getState
) => {
  await AsyncStorage.setItem(
    `@dreamColorStatisticAbove`,
    JSON.stringify(indicator)
  );

  dispatch(setDreamColorIndicatorAbove(indicator));
};

export const setStatisticColorStatisticAbove = (indicator) => async (
  dispatch,
  getState
) => {
  await AsyncStorage.setItem(
    `@statisticColorStatisticAbove`,
    JSON.stringify(indicator)
  );

  dispatch(setStatisticColorIndicatorAbove(indicator));
};

export const getColorStatisticTC = () => async (dispatch) => {
  const dreamColorStatistic = JSON.parse(
    await AsyncStorage.getItem("@dreamColorStatistic")
  );
  const statisticColorStatistic = JSON.parse(
    await AsyncStorage.getItem("@statisticColorStatistic")
  );
  const dreamColorStatisticAbove = JSON.parse(
    await AsyncStorage.getItem("@dreamColorStatisticAbove")
  );
  const statisticColorStatisticAbove = JSON.parse(
    await AsyncStorage.getItem("@statisticColorStatisticAbove")
  );
  const gestureActive = JSON.parse(
    await AsyncStorage.getItem("@gestureActive")
  );

  dreamColorStatistic !== null &&
    dispatch(setDreamColorIndicator(dreamColorStatistic));
  statisticColorStatistic !== null &&
    dispatch(setStatisticColorIndicator(statisticColorStatistic));
  dreamColorStatisticAbove !== null &&
    dispatch(setDreamColorIndicatorAbove(dreamColorStatisticAbove));
  statisticColorStatisticAbove !== null &&
    dispatch(setStatisticColorIndicatorAbove(statisticColorStatisticAbove));
  gestureActive !== null && dispatch(setGesture(gestureActive));
}






