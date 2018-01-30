import styled from 'styled-components'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-flow: column wrap;
  padding: 80px 5% 5% 5%;

  .dummy {
    display: none;
  }
  .cover {
    background-color: rgb(223, 223, 223);
    height: 350px;
    position: relative;
    width: 100%;
  }
  .content {
    width: 100%;
  }
`

export default Wrapper