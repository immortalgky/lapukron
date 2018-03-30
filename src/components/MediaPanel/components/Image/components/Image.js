import React from 'react'
import { 
  Wrapper, 
  ImageContainer, 
  Image, 
  UploadImage,
  UploadButton, 
  File, 
  ProgressBar, 
  SVG, 
  PathGrey, 
  Path, 
  Progress } from './Style'

export default (props) => {
  const { store } = props

  const handleFileOnChange = (e) => {
    store.setState({ uploading: true })
    
    e.target.value = ''
  }

  return (
    <Wrapper>
      <ImageContainer>
        <UploadImage
          onClick={() => this.file.click()}
        />
        { store.getState('lists').map(img => 
            <Image/>
          ) 
        }
      </ImageContainer>
      {/* <UploadButton
        onClick={() => this.file.click()}
      >
        <i className='fas fa-cloud-upload'/>
      </UploadButton> */}
      <File
        innerRef={r => this.file = r}
        onChange={handleFileOnChange}
      />
      { store.getState('uploading') &&
        <ProgressBar>
          <SVG>
          <PathGrey 
            d='M 85 85 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0'
            style={{fill: 'none'}}  
          />
          <Path
            d='M 85 85 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0'
            style={{fill: 'none'}}  
            progress={store.getState('progress')}
          />
          </SVG>
          <Progress>
            { store.getState('progress') + '%' }
          </Progress>
        </ProgressBar>
      }
    </Wrapper>
  )
}
