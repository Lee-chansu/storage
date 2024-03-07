const formData = new FormData();

formData.append('title', '라라랜드')
formData.append('rating', 5)
formData.append('content', '재미있다')

fetch('https://learn.codeit.learn.reviews', {
    mehtod : 'POST'
})