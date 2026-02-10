# Full Stack – Web Developer Intern Test  
PT Aksamedia Mulia Digital

## 📌 Deskripsi
Project ini merupakan hasil pengerjaan **Full Stack Web Developer Intern Test** yang terdiri dari:

- **Tugas 1**: Frontend (tanpa API – local storage)
- **Tugas 2**: Backend (Laravel REST API)
- **Tugas 3**: Integrasi Frontend & Backend sehingga menjadi website yang dinamis

Aplikasi ini menampilkan manajemen data **Employee** dan **Division** dengan autentikasi berbasis token, UI responsif, dan integrasi API penuh.

---

## 🛠️ Tech Stack

### Frontend
- **Vue 3** (Vite)
- **JavaScript** (Non-TypeScript)
- **Tailwind CSS v4**
- **Vue Router**
- **Fetch API**

### Backend
- **Laravel**
- **MySQL / MariaDB**
- **Laravel Eloquent ORM**
- **Request Validation**
- **Seeder & Migration**
- **Token-based Authentication**

### Tools
- Postman
- Git & GitHub

---

## 🌐 Link Deploy & Repository Github

* **Frontend**:

  👉 `https://aksamedia-fe.rezweb.my.id` *(Lokal Tanpa API)*

  👉 `https://aksamedia-fe-api.rezweb.my.id` *(Sudah Integrasi API)*

* **Backend API**:

  👉 `https://api-aksamedia-be.rezweb.my.id`

* **Repository GitHub**:

  👉 `https://github.com/reztechcode/aksamedia-backend-test` *(Lokal Tanpa API)*

  👉 `https://github.com/reztechcode/aksamedia-backend-test` *(Integrasi Dengan API)*

  👉 `https://github.com/reztechcode/aksamedia-backend-test` *(Backend)*

---

## 📦 API Endpoint Ringkas

| Method | Endpoint          | Keterangan      |
| ------ | ----------------- | --------------- |
| POST   | `/login`          | Login           |
| POST   | `/logout`         | Logout          |
| GET    | `/divisions`      | List divisions  |
| GET    | `/employees`      | List employee   |
| POST   | `/employees`      | Create employee |
| PUT    | `/employees/{id}` | Update employee |
| DELETE | `/employees/{id}` | Delete employee |

---

## 📝 Catatan Tambahan

* Frontend awalnya dibangun **tanpa API (Tugas 1)** dan kemudian diintegrasikan ke backend (**Tugas 3**)
* Struktur kode dibuat modular dan mudah dikembangkan
* Seluruh ketentuan frontend & backend telah diimplementasikan sesuai soal

---

Terima kasih 🙏