# Marvel Heroes App

Este proyecto es una aplicación desarrollada en Angular 17 que proporciona un listado de héroes de Marvel. La aplicación muestra 50 tarjetas de héroes en la página principal. Cada tarjeta permite acceder a la información detallada del héroe, incluyendo los cómics en los que ha aparecido.

## Características

- **Landing Page**: Muestra 50 tarjetas de héroes con información básica.
- **Información Detallada**: Al hacer clic en una tarjeta, se accede a la información detallada del héroe y a los cómics relacionados.
- **Likes y Favoritos**: Los usuarios pueden dar "likes" a los héroes y acceder a un listado de héroes favoritos.
- **Estructura Modular**: La aplicación está organizada en carpetas para facilitar su mantenimiento y escalabilidad.

## Estructura de Carpetas

La estructura de carpetas del proyecto es la siguiente:

- `src/app`
  - `pages/` : Contiene las páginas principales de la aplicación.
  - `components/` : Contiene los componentes reutilizables.
  - `layout/` : Contiene los componentes relacionados con la disposición de la aplicación (e.g., header, footer).
  - `guards/` : Contiene los guards de Angular para la navegación.
  - `services/` : Contiene los servicios de la aplicación para manejar la lógica de negocio y las llamadas a la API.
  - `utils/` : Contiene utilidades y funciones auxiliares.
  - `environments/` : Contiene los archivos de configuración para diferentes entornos (e.g., desarrollo, producción).

## Instalación

Para clonar y ejecutar esta aplicación, sigue los siguientes pasos:

1. Clona este repositorio en una carpeta donde quieras guardar el proyecto:
    ```bash
    git clone https://github.com/MarioVillar25/HeroesApp.git
    ```

2. Navega al directorio del proyecto:
    ```bash
    cd nomdreDeLaCarpeta
    ```

3. Instala las dependencias del proyecto:
    ```bash
    npm install
    ```

## Uso

Para ejecutar la aplicación en un entorno de desarrollo, usa el siguiente comando:
```bash
ng serve
