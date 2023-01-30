import { NavBar } from './navbar';

export function Sidebar() {
  return (
    <div className='relative hidden h-screen my-4 ml-4 shadow-lg lg:block w-80'>
      <div className='h-full bg-white rounded-2xl dark:bg-gray-700'>
        <div className='flex items-center justify-center pt-4'>
          <div className='text-green-900 w-10 h-10'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              version='1.1'
              viewBox='0 0 447 470'
            >
              <g>
                <path
                  fill='currentColor'
                  d='M240.826 459.82c3.139-10.367 4.547-125.915 1.605-131.7-3.784-7.441-9.659-7.518-23.982-.312-15.853 7.976-15.816 24.017.285 124.545l1.327 8.283-4.565-.638c-23.156-3.238-62.065-14.527-62.065-18.007 0-.65 1.078-4.05 2.395-7.553 15.445-41.066 28.426-85.849 26.541-91.562-4.11-12.455-31.909-8.096-37.952 5.95-4.427 10.293-15.923 64.236-16 75.081-.036 5.14-1.46 5.237-8.637.585-18.366-11.908-36.831-29.09-54.822-51.016-38.191-46.541-54.714-118.654-41.908-182.907 3.077-15.437 1.722-14.41 16.485-12.507 87.636 11.29 99.383 27.29 86.263 117.507-4.161 28.611-3.496 30.058 14.936 32.461 44.517 5.805 83.936-5.091 111.264-30.756 13.971-13.121 14.869-17.407 6.848-32.705-36.496-69.605-45.315-134.388-29.813-219 6.218-33.936 8.15-37.887 17.09-34.937 6.502 2.146 6.787 3.934 5.328 33.432-5.678 114.817 56.02 134.325 146.563 46.34 15.593-15.152 19.593-16.751 25.964-10.38 7.135 7.135 7.541 6.395-27.57 50.188-29.242 36.473-39.925 52.178-51.059 75.056-9.266 19.04-13.982 23.302-30.916 27.936-9.496 2.598-39.692 2.601-49.317.004-7.157-1.931-8.806-1.66-7.057 1.159 6.142 9.903 41.432 12.361 67.17 4.678 11.878-3.546 13.97.083 21.206 36.786 6.229 31.595 11.742 49.59 34.11 111.341 17.495 48.302 17.625 49.345 6.818 54.933-11.915 6.161-17.535-.402-37.275-43.536-29.699-64.895-39.578-81.763-50.939-86.974-16.267-7.462-22.188 11.031-33.678 105.192-3.886 31.846-5.92 39.52-11.352 42.832-4.357 2.656-14.08 2.802-13.291.2zM151.93 166.017c-18.227-4.202-82.375-9.449-115.53-9.449-4.728 0-4.808.338 4.471-18.727C70.488 76.997 123.253 33.806 188.431 17.059c9.26-2.38 27.062-5.761 27.583-5.24.143.144-2.607 8.809-6.111 19.256-9.802 29.217-23.717 85.586-28.51 115.494-2.77 17.293-12.1 23.452-29.462 19.45zm-35.07-15.335c.301-.488-.098-1.423-.886-2.077-2.225-1.847-7.544-10.526-7.544-12.31 0-.99 2.082.486 5.481 3.885 13.736 13.736 35.642 15.36 47.482 3.52 14.682-14.682 12.783-40.564-4.203-57.289-6.876-6.77-6.921-8.06-.165-4.695 9.917 4.938 16.96 14.597 19.478 26.71 1.322 6.36 1.862 5.978 5.457-3.858 2.167-5.929 2.843-9.827 3.226-18.61l.485-11.11-9.938-.48c-8.944-.43-10.647-.839-17.014-4.084-39.13-19.941-67.02 1.886-64.89 50.784.527 12.09.358 14.715-1.237 19.239-2.087 5.918-1.509 6.763 6.683 9.776 4.134 1.52 16.75 1.95 17.585.599zm178.07-18.513c-27.38-8.659-33.724-44.821-11.81-67.326 22.809-23.424 59.31-8.048 59.31 24.984 0 27.33-24.87 49.5-47.5 42.342z'
                ></path>
              </g>
            </svg>
          </div>
          {/* <svg
            width='35'
            height='30'
            viewBox='0 0 256 366'
            version='1.1'
            preserveAspectRatio='xMidYMid'
          >
            <defs>
              <linearGradient
                x1='12.5189534%'
                y1='85.2128611%'
                x2='88.2282959%'
                y2='10.0225497%'
                id='linearGradient-1'
              >
                <stop
                  stopColor='#FF0057'
                  stopOpacity='0.16'
                  offset='0%'
                ></stop>
                <stop
                  stopColor='#FF0057'
                  offset='86.1354%'
                ></stop>
              </linearGradient>
            </defs>
            <g>
              <path
                d='M0,60.8538006 C0,27.245261 27.245304,0 60.8542121,0 L117.027019,0 L255.996549,0 L255.996549,86.5999776 C255.996549,103.404155 242.374096,117.027222 225.569919,117.027222 L145.80812,117.027222 C130.003299,117.277829 117.242615,130.060011 117.027019,145.872817 L117.027019,335.28252 C117.027019,352.087312 103.404567,365.709764 86.5997749,365.709764 L0,365.709764 L0,117.027222 L0,60.8538006 Z'
                fill='#001B38'
              ></path>
              <circle
                fill='url(#linearGradient-1)'
                transform='translate(147.013244, 147.014675) rotate(90.000000) translate(-147.013244, -147.014675) '
                cx='147.013244'
                cy='147.014675'
                r='78.9933938'
              ></circle>
              <circle
                fill='url(#linearGradient-1)'
                opacity='0.5'
                transform='translate(147.013244, 147.014675) rotate(90.000000) translate(-147.013244, -147.014675) '
                cx='147.013244'
                cy='147.014675'
                r='78.9933938'
              ></circle>
            </g>
          </svg> */}
        </div>
        <NavBar />
      </div>
    </div>
  );
}
