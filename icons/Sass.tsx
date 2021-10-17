import React from 'react';

function Sass(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={64}
      height={76}
      viewBox="0 0 64 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M54.957 43.365c-2.227.018-4.162.862-5.782 2.11-.595-1.854-1.19-3.504-1.294-4.715-.117-1.413-.257-2.275-.117-3.963.14-1.687.77-4.09.758-4.274-.012-.183-.14-1.046-1.422-1.064-1.283-.018-2.39.385-2.518.917a32.485 32.485 0 00-.537 2.99c-.221 1.835-2.564 8.384-3.905 11.814-.431-1.339-.804-2.513-.886-3.448-.116-1.413-.256-2.275-.116-3.963.14-1.688.77-4.09.757-4.274-.011-.183-.14-1.046-1.422-1.064-1.282-.018-2.39.385-2.518.917-.128.532-.268 1.78-.536 2.99-.268 1.211-3.38 12.145-4.197 14.97a111.35 111.35 0 01-1.037 3.393s-.012.056-.047.147c-.114.351-.23.7-.35 1.046v.018c-.175.496-.361.954-.454.954-.07 0-.199-1.32.023-3.119.466-3.797 1.574-9.704 1.562-9.906 0-.11.21-1.137-.723-1.67-.91-.531-1.235.35-1.317.35-.082 0-.14.311-.14.311s1.014-6.64-1.935-6.64c-1.842 0-4.383 3.173-5.642 6.035a1552.034 1552.034 0 00-4.29 3.687c-.688.606-1.4 1.211-2.064 1.78-.046-.074-.093-.166-.14-.239-3.567-5.998-10.165-10.236-9.885-18.29.105-2.934.746-10.64 12.672-19.995 9.815-7.613 17.626-5.504 18.978-.826 1.935 6.678-4.185 19.079-14.327 20.877-3.87.678-5.899-1.67-6.412-2.55-.536-.918-.618-.973-.816-.789-.326.275-.116 1.1 0 1.578.303 1.247 1.55 3.448 3.66 4.53 1.866.954 6.4 1.487 11.891-1.852 6.144-3.743 10.947-14.144 9.536-22.857C38.555.438 29.23-2.48 20.404 2.456 15.158 5.392 9.469 10.014 5.377 16.031.517 23.186-.253 29.404.061 32.01c1.131 9.245 9.233 15.262 12.474 19.72-.163.147-.315.275-.443.386-1.62 1.265-7.799 6.346-9.338 11.721-1.748 6.09.28 10.457 1.62 11.044 4.163 1.816 8.44-1.45 10.737-6.843 2.297-5.393 2.017-12.4.956-15.61-.011-.037-.023-.075-.046-.111.42-.385.85-.789 1.27-1.174a62.155 62.155 0 012.344-2.073c-.397 1.706-.688 3.742-.828 6.677-.175 3.45.722 7.925 1.9 9.686.525.771 1.142.79 1.539.79 1.375 0 1.993-1.799 2.681-3.927.84-2.604 1.597-5.631 1.597-5.631s-.944 8.182 1.62 8.182c.933 0 1.877-1.908 2.297-2.88v.017s.023-.055.07-.183l.152-.385v-.037a201.226 201.226 0 002.46-7.228c1.608-4.99 3.159-11.226 3.159-11.226s.14 1.522.617 4.054c.28 1.486.863 3.118 1.33 4.696-.374.826-.607 1.284-.607 1.284l.012.018c-.303.624-.63 1.303-.991 1.964-1.27 2.384-2.786 5.118-2.996 5.906-.245.936-.187 1.615.28 2.165.338.404.944.458 1.562.404 1.142-.129 1.947-.57 2.343-.844a7.554 7.554 0 002.017-1.67c1.247-1.45 2.005-3.522 1.935-6.255-.035-1.504-.35-3.009-.735-4.421.117-.257.222-.514.339-.77 1.97-4.532 3.497-9.504 3.497-9.504s.14 1.523.618 4.055c.233 1.284.71 2.678 1.13 4.035-1.853 2.367-2.996 5.119-3.404 6.917-.734 3.338-.163 4.842.921 5.191.49.165 1.19-.202 1.702-.55.653-.33 1.423-.899 2.157-1.743 1.248-1.45 2.448-3.467 2.378-6.2-.035-1.248-.245-2.477-.536-3.67 1.574-1.026 3.602-1.595 6.19-1.118 5.55 1.027 6.645 6.475 6.435 8.769-.21 2.292-1.376 3.54-1.76 3.925-.385.386-.513.514-.478.789.046.404.233.385.56.312.454-.128 2.914-1.853 3.019-6.072.175-5.394-3.09-11.282-8.86-11.227zM12.15 66.075c-1.842 3.156-4.406 4.348-5.514 3.34-1.189-1.083-.722-5.743 1.54-9.081 1.375-2.037 3.147-3.927 4.324-5.082.268-.257.665-.623 1.143-1.082a2.73 2.73 0 01.128-.11l.28-.276c.827 4.77.035 8.971-1.9 12.292zM25.557 51.73c-.642 2.458-1.982 8.75-2.798 8.402-.7-.294-1.131-5.063-.14-9.778.501-2.367 1.562-5.192 2.18-6.292 1.002-1.761 2.11-2.349 2.378-1.633.338.936-1.224 7.76-1.62 9.3zm11.063 8.328c-.269.22-.525.367-.642.257-.081-.073.117-.367.117-.367s1.387-2.348 1.935-3.412c.315-.623.688-1.357 1.084-2.183v.239c0 2.806-1.725 4.696-2.495 5.466zm8.533-3.063c-.198-.22-.163-.954.501-3.247.257-.9.863-2.403 1.9-3.852.117.587.199 1.155.187 1.687-.012 3.54-1.62 4.861-2.588 5.412z"
        fill="#CD6799"
      />
    </svg>
  )
}

export default Sass