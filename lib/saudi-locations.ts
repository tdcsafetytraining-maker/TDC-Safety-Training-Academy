export const saudiProjectLocations = {
  'Eastern Region Projects': [
    'Abqaiq', 'Al Ahsa', 'Al Hofuf', 'Al Jubail', 'Al Khafji', 'Al Khobar', 'Al Nairyah', 'Al Qatif', 'Al Uqair', 'Dammam', 'Dhahran', 'Hafar Al Batin', 'Juaymah', 'Qaisumah', 'Qaryat Al Ulya', 'Ras Al Khair', 'Ras Tanura', 'Saihat', 'Safwa', 'Sarrar', 'Tanajib', 'Tarout', 'Udhailiyah'
  ],
  'Western Region Projects': [
    'Adham', 'Al Ais', 'Al Ardiyat', 'Al Bad', 'Al Hanakiyah', 'Al Jumum', 'Al Kamil', 'Al Khurma', 'Al Lith', 'Al Mahd', 'Al Muwayh', 'Al Qunfudhah', 'Al Ula', 'Al Wajh', 'Badr', 'Bahrah', 'Duba', 'Haql', 'Jeddah', 'Khaybar', 'Khulais', 'Madinah', 'Makkah', 'Masturah', 'Maysan', 'Rabigh', 'Ranyah', 'Taif', 'Tayma', 'Thuwal', 'Turubah', 'Umluj', 'Wadi Al Fara', 'Yanbu'
  ],
  'Central Region Projects': [
    'Afif', 'Al Aflaj', 'Al Badayea', 'Al Bukayriyah', 'Al Dilam', 'Al Duwadimi', 'Al Ghat', 'Al Hariq', 'Al Kharj', 'Al Majmaah', 'Al Mithnab', 'Al Muzahimiyah', 'Al Nabhaniyah', 'Al Quwayiyah', 'Al Rass', 'Al Rayn', 'Al Shimasiyah', 'Al Sulayyil', 'Al Zulfi', 'Asyah', 'Buraidah', 'Dariah', 'Dhurma', 'Diriyah', 'Hotat Bani Tamim', 'Huraymila', 'Layla', 'Marat', 'Riyadh', 'Riyadh Al Khabra', 'Rumah', 'Shaqra', 'Thadiq', 'Unaizah', 'Uqlat As Suqur', 'Ushaiqer', 'Uyun Al Jiwa', 'Wadi Ad Dawasir'
  ],
  'Southern Region Projects': [
    'Abha', 'Abu Arish', 'Ad Darb', 'Ahad Al Masarih', 'Ahad Rafidah', 'Al Aqiq', 'Al Ardah', 'Al Aydabi', 'Al Baha', 'Al Dair', 'Al Hajrah', 'Al Harajah', 'Al Harth', 'Al Majardah', 'Al Makhwah', 'Al Mandaq', 'Al Namas', 'Al Qahmah', 'Al Qara', 'Al Rayth', 'Al Tuwal', 'Al Wadiayn', 'Baish', 'Baljurashi', 'Balqarn', 'Bani Hasan', 'Bariq', 'Bisha', 'Damad', 'Dhahran Al Janub', 'Farasan', 'Fayfa', 'Ghamid Al Zinad', 'Habuna', 'Harub', 'Jazan', 'Khamis Mushait', 'Khubash', 'Muhayil Asir', 'Najran', 'Qilwah', 'Rijal Almaa', 'Sabya', 'Samtah', 'Sarat Abidah', 'Sharurah', 'Tanumah', 'Tareeb', 'Tathlith', 'Thar', 'Yadamah'
  ],
  'Northern Region Projects': [
    'Al Ghazalah', 'Al Qurayyat', 'Al Shinan', 'Al Shumli', 'Al Uwayqilah', 'Arar', 'Baqa', 'Dumat Al Jandal', 'Hail', 'Jubbah', 'Mawqaq', 'Rafha', 'Sakaka', 'Samira', 'Tabarjal', 'Tabuk', 'Turaif', 'Waad Al Shamal'
  ],
} as const;

export type SaudiProjectRegion = keyof typeof saudiProjectLocations;
export const saudiProjectRegions = Object.keys(saudiProjectLocations) as SaudiProjectRegion[];

