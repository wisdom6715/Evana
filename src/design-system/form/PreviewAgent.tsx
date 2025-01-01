import React from 'react'

const PreviewAgent = () => {
  return (
    <div style={{
      width: '70%', 
      height: '80%', 
      backgroundColor: 'transparent',
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateRows: '40% 60%'
      }}>
        <div style={{
          background: 'linear-gradient(to bottom, #004d40, #e3fffa)',
          borderTopLeftRadius: '1.2rem',
          borderTopRightRadius: '1.2rem',
          display: 'flex',
          flexDirection: 'column',
          padding: '0 7%',
          gap: '.5rem'
        }}>
          <div style={{
            width: '100%',
            height: '80%',
            backgroundColor: 'transparent'
          }}></div>
          <div style={{
            width: '100%',
            height: '20%',
            backgroundColor: 'white',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            padding: '0px 10px',
            justifyContent:'space-between',
            border: '.1rem solid grey',
            borderRadius: '1rem',
            cursor: "pointer"
          }}> 
            <p>Send a message </p>
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" fill="none" viewBox="0 0 17 16">
              <path fill="currentColor" d="m4.563 14.605 9.356-5.402c1-.577 1-2.02 0-2.598L4.563 1.203a1.5 1.5 0 0 0-2.25 1.3v10.803a1.5 1.5 0 0 0 2.25 1.3M6.51 8.387 2.313 9.512V6.297L6.51 7.42c.494.133.494.834 0 .966"></path>
            </svg>
          </div>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateRows: '83% 17%'
        }}>
          <div style={{
            backgroundColor: 'white',
            overflowY: 'scroll'
          }}>
            <p>Updates</p>
          </div>
          <div style={{
            width: '100%',
            borderBottomRightRadius: '1.2rem',
            borderBottomLeftRadius: '1.2rem',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            border: '.1rem solid rgb(201, 197, 197)'
          }}>
            <svg className="nav-home" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="18" height="18" fill="black">
              <path d="M19,24H5c-2.757,0-5-2.243-5-5V9.724c0-1.665,.824-3.215,2.204-4.145L9.203,.855c1.699-1.146,3.895-1.146,5.594,0l7,4.724c1.379,.93,2.203,2.479,2.203,4.145v9.276c0,2.757-2.243,5-5,5ZM12,1.997c-.584,0-1.168,.172-1.678,.517L3.322,7.237c-.828,.558-1.322,1.487-1.322,2.486v9.276c0,1.654,1.346,3,3,3h14c1.654,0,3-1.346,3-3V9.724c0-.999-.494-1.929-1.321-2.486L13.678,2.514c-.51-.345-1.094-.517-1.678-.517Z"/>
            </svg>
            <svg className="nav-message" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="18" height="18" fill='black'>
              <path d="m19,4h-1.101c-.465-2.279-2.485-4-4.899-4H5C2.243,0,0,2.243,0,5v12.854c0,.794.435,1.52,1.134,1.894.318.171.667.255,1.015.255.416,0,.831-.121,1.19-.36l2.95-1.967c.691,1.935,2.541,3.324,4.711,3.324h5.697l3.964,2.643c.36.24.774.361,1.19.361.348,0,.696-.085,1.015-.256.7-.374,1.134-1.1,1.134-1.894v-12.854c0-2.757-2.243-5-5-5ZM2.23,17.979c-.019.012-.075.048-.152.007-.079-.042-.079-.109-.079-.131V5c0-1.654,1.346-3,3-3h8c1.654,0,3,1.346,3,3v7c0,1.654-1.346,3-3,3h-6c-.327,0-.541.159-.565.175l-4.205,2.804Zm19.77,3.876c0,.021,0,.089-.079.131-.079.041-.133.005-.151-.007l-4.215-2.811c-.164-.109-.357-.168-.555-.168h-6c-1.304,0-2.415-.836-2.828-2h4.828c2.757,0,5-2.243,5-5v-6h1c1.654,0,3,1.346,3,3v12.854Z"/>
            </svg>
            <svg className="nav-call" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="18" height="18" fill="black">
              <path d="M13,1a1,1,0,0,1,1-1A10.011,10.011,0,0,1,24,10a1,1,0,0,1-2,0,8.009,8.009,0,0,0-8-8A1,1,0,0,1,13,1Zm1,5a4,4,0,0,1,4,4,1,1,0,0,0,2,0,6.006,6.006,0,0,0-6-6,1,1,0,0,0,0,2Zm9.093,10.739a3.1,3.1,0,0,1,0,4.378l-.91,1.049c-8.19,7.841-28.12-12.084-20.4-20.3l1.15-1A3.081,3.081,0,0,1,7.26.906c.031.031,1.884,2.438,1.884,2.438a3.1,3.1,0,0,1-.007,4.282L7.979,9.082a12.781,12.781,0,0,0,6.931,6.945l1.465-1.165a3.1,3.1,0,0,1,4.281-.006S23.062,16.708,23.093,16.739Zm-1.376,1.454s-2.393-1.841-2.424-1.872a1.1,1.1,0,0,0-1.549,0c-.027.028-2.044,1.635-2.044,1.635a1,1,0,0,1-.979.152A15.009,15.009,0,0,1,5.9,9.3a1,1,0,0,1,.145-1S7.652,6.282,7.679,6.256a1.1,1.1,0,0,0,0-1.549c-.031-.03-1.872-2.425-1.872-2.425a1.1,1.1,0,0,0-1.51.039l-1.15,1C-2.495,10.105,14.776,26.418,20.721,20.8l.911-1.05A1.121,1.121,0,0,0,21.717,18.193Z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewAgent