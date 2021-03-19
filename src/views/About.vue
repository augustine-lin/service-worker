<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>{{ name }}</div>
    <video controls
           src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
           poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
           width="620">

      Sorry, your browser doesn't support embedded videos,
      but don't worry, you can <a href="https://archive.org/details/BigBuckBunny_124">download it</a>
      and watch it with your favorite video player!

    </video>
  </div>
</template>
<script>
export default {
  data () {
    return {
      name: ''
    }
  },
  mounted () {
    this.doFetch()
  },
  methods: {
    doFetch () {
      console.log('http://10.60.6.77:3002/api/123')
      fetch('http://10.60.6.77:3002/api/123')
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          console.log('Success:', response)
          this.name = response.username
        })
    }
  }
}
</script>
