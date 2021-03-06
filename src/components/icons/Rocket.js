const Rocket = (props) => (
  <svg
    width={64}
    height={64}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={64} height={64} rx={13} fill="#1A4587" />
    <path
      d="M49.462 14.492c-.092-.432-.52-.86-.953-.952-2.516-.54-4.485-.54-6.446-.54-8.065 0-12.901 4.313-16.512 10h-8.142c-1.277.001-2.778.928-3.35 2.07l-3.862 7.719a2.22 2.22 0 0 0-.197.836 1.876 1.876 0 0 0 1.876 1.875h8.11l-1.756 1.755c-.888.888-1.015 2.52 0 3.535l3.977 3.978c.871.874 2.512 1.027 3.537 0l1.756-1.756v8.113A1.876 1.876 0 0 0 29.375 53c.29-.01.573-.077.837-.197l7.713-3.858c1.143-.57 2.07-2.07 2.07-3.349v-8.159C45.668 33.82 50 28.968 50 20.946c.007-1.97.007-3.938-.537-6.454Zm-9.459 11.633a3.125 3.125 0 1 1 .002-6.25 3.125 3.125 0 0 1-.002 6.25Z"
      fill="#fff"
    />
  </svg>
);

export default Rocket;
