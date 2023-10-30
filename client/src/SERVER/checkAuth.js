export const checkLoggedIn = (
  endpoint,
  method,
  callback,
  data=null,
) => {
  const xhttp = new XMLHttpRequest()
  
  xhttp.withCredentials = true
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      callback(JSON.parse(xhttp.responseText))
    }
  }
  xhttp.open(method, endpoint, true)
  xhttp.setRequestHeader("Content-type", "application/json")
  xhttp.send(data)
  
}