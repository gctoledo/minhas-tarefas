import styled from 'styled-components'

export const FormS = styled.form`
  max-width: 547px;
  width: 100%;
  font-weight: bold;
  font-size: 14px;
  color: #666;

  textarea {
    resize: none;
    margin: 16px 0;
  }
`
export const Options = styled.div`
  margin-bottom: 16px;

  p {
    margin-bottom: 6px;
  }
`

export const Option = styled.div`
  display: inline;
  text-transform: capitalize;

  label,
  input {
    margin-right: 6px;
  }
`
