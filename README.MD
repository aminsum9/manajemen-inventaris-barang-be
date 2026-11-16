Requirement
- node.js v22.21.1

Cara menjalankan aplikasi
1. Jalankan perintah berikut untuk menjalankan aplikasi menggunakan docker: docker compose up -d --build
2. Jalankan perintah berikut untuk migrasi database ke postgres docker: docker compose exec app npx sequelize-cli db:migrate
3. Jika berhasil aplikasi backend sudah bisa dites menggunakan postman dengan mengimport terlebih dahulu file export "Manajemen Inventaris Barang.postman_collection.json" yang berada di folder postman pada project ini
4. Untuk menghentikan container gunakan perintah: docker compose down
5. Untuk menghentikan sekaligus menghapus data database pada docker: docker compose down -v

Pertanyaan
1. Alur Request: Jelaskan alur perjalanan sebuah request dari saat API dipanggil oleh client hingga data tersimpan di database. (Misal: Router -> Middleware -> Controller -> Service -> Repository). Mengapa Anda memisahkan logic seperti itu?
 
    Jawaban: Pada projek yang saya buat ini alur aliran data sampai data tersimpan ke database adalah pertama user menghit API dengan method GET, POST, PUT, atau DELETE sesuai API yang dipanggil lalu data akan masuk ke Router -> Middlewate (untuk endpoint yang memerlukan autentikasi atau validasi data) -> Controller -> Service -> Repository, saya memisahkan seperti itu agar code bisa lebih terstruktur sesuai letak dan fungsinya, seperti Router berisi daftar endpoint yang bisa di hit dari sisi frontend, Middlewate berisi code autentikasi atau validasi data untuk endpoint yang mengharuskan autentikasi atau validasi data terlebih dahulu, controller yang berisi definisi dan validasi tambahan untuk request sebelum dilanjutkan ke service, service yang berisi validasi data secara spesifik dan logic bisnis, dan repository yang berisi code melakukan aksi ke database seperti get, insert, update, dan delete.

2. Keamanan & Token: Dimana sebaiknya frontend menyimpan token JWT yang dikembalikan oleh API ini (Local Storage atau HttpOnly Cookie)? Apa alasan dan risiko keamanannya?

    Jawaban: Token JWT dari API lebih aman disimpan ke HttpOnly Cookie karena JavaScript tidak bisa membacanya atau bisa dibilang disimpan oleh browser tetapi tidak bisa dilihat oleh pengguna dari sisi frontend sehingga memiliki perlindungan lebih baik salah satunya terhadap serangan XSS yang dilakukan dengan menyuntikkan code JavaScript di sisi frontend untuk mencuri token, walau begitu masih banyak website dari yang menengah sampai yang besar menggunakan Local Storage karena salah satunya lebih fleksibel sehingga bisa dengan mudah digunakan lintas aplikasi atau platform, keduanya memiliki kelebihan dan kekurangan tetapi dengan configurasi dan pengamanan tambahan yang tepat keamanan token di aplikasi bisa lebih baik.

3. Penanganan Konkurensi (Concurrency): Misalkan API Anda dipublish ke publik, lalu ada 2 user yang secara TEPAT BERSAMAAN melakukan request untuk mengurangi stok barang X (stok tersisa: 1). Bagaimana cara Anda mencegah stok menjadi -1 di database?

    Jawaban: salah satu cara menantisipasi value pada kolom stock menjadi negatif adalah dengan menambahkan constraint pada database yang mencegah kolom stock menjadi negatif, untuk kasus tersebut biasanya terjadi jika update stock memiliki API terpisah dengan update product misal stock diubah saat melakukan pesanan oleh 2 user yang berbeda, untuk mengatasi hal tersebut selain dengan contrain juga bisa ditambahkan function dari Sequelize yang mampu melakukan pengecekan data sekaligus pengubahan data secara bersamaan yang codenya menggunakan code increment dan decrement, jika terjadi error, erorr bisa diketaui lebih spesifik.
