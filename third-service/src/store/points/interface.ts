export interface dateFrom {
  startDate: number | string;
  endDate: number | string;
}

export interface pointsStore {
  getHealthRecords: (data: dateFrom) => any;
  setHealthRecords: (data: any) => any;
  recordList: any;
  setTodayData: (data: any) => any;
  todayData: any;
}
