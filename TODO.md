# TODO - Theme Toggle Refactoring

## Plan:
- [x] 1. Buat theme utility di config.js - fungsi centralized untuk deteksi theme
- [ ] 2. Refactor states.js - perbaiki toggleTheme() dan hapus kode duplikat
- [ ] 3. Refactor charts.js - hapus getPieThemeColors() yang tidak digunakan
- [ ] 4. Test dan verify theme toggle bekerja dengan benar untuk semua chart

## Perubahan:
1. **config.js**: Tambah Theme utilities (isDark, getThemeColors)
2. **states.js**: 
   - Hapus kode duplikat di toggleTheme()
   - Gunakan updateAllCharts() yang centralized
   - Hapus legacy variables
3. **charts.js**: 
   - Hapus getPieThemeColors() yang tidak digunakan
   - Gunakan Theme utilities dari config
