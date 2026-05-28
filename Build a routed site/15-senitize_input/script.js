import sanitizeHtml from 'sanitize-html'


const hacker = {
 title: 'Dr',
 surname: '<script>Evil</script>',
 location: 'A dark room somewhere'
}


console.log(sanitizeHtml(hacker.title))
console.log(sanitizeHtml(hacker.surname))
console.log(sanitizeHtml(hacker.location))
