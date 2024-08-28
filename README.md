# Barkod Yönetim Sistemi

Bu proje, Laravel ve React.js kullanarak geliştirilmiş bir barkod yönetim sistemidir. Uygulama, kamerayı açarak barkodları okuyabilir, bu barkodları sepete ekleyebilir ve yeni barkodlar ekleyebilirsiniz. Veritabanı olarak MySQL kullanılmıştır.

![Proje Ekran Görüntüsü](proje-ekran-goruntusu.png)

## Özellikler

- **Barkod Okuma:** Kamerayı kullanarak barkodları okuyun.
- **Sepete Ekleme:** Okunan barkodları sepete ekleyin.
- **Yeni Barkod Ekleme:** Yeni barkodlar ekleyin ve yönetin.
- **Veritabanı Entegrasyonu:** MySQL veritabanı ile ürünleri ve barkodları saklayın.

## Kurulum

Bu projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

1. **Depoyu klonlayın:**

    ```bash
    git clone https://github.com/kullaniciadi/proje-adi.git
    ```

2. **Laravel Backend Kurulumu:**

    - Laravel bağımlılıklarını yükleyin:

        ```bash
        cd proje-adi/backend
        composer install
        ```

    - `.env` dosyasını oluşturun ve veritabanı bilgilerini girin:

        ```bash
        cp .env.example .env
        ```

    - Veritabanı şemasını oluşturun:

        ```bash
        php artisan migrate
        ```

    - Laravel uygulamasını başlatın:

        ```bash
        php artisan serve
        ```

3. **React Frontend Kurulumu:**

    - React bağımlılıklarını yükleyin:

        ```bash
        cd ../frontend
        npm install
        ```

    - React uygulamasını başlatın:

        ```bash
        npm start
        ```

## Kullanım

1. **Kamera Kullanımı:**

    Uygulamayı başlattıktan sonra, kamerayı açarak barkod okuyabilirsiniz. Barkodlar otomatik olarak sepete eklenir.

2. **Sepete Ekleme:**

    Barkod okunduğunda ürün sepete eklenir ve sepetteki ürünler güncellenir.

3. **Yeni Barkod Ekleme:**

    Sepet ekranında yeni barkod ekleyebilirsiniz.
