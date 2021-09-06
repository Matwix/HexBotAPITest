App = {
  name: 'HexBot API Test',
  endpoint: 'https://hexbot.proj.vtc.gg/',
  loading: false,
  token: '',
  showform: true,

  load: async() => {
    await App.render()
  },

  pollConnection: () => {
    $('#status').parent().prop('href', App.endpoint)
    axios.get(`${App.endpoint}api/status`)
      .then((res) => {
        $('#status').text('API is Online!')
        if(App.showform) {
          $('.form').show()
        }
      })
      .catch((err) => {
        $('#status').text('API is Down!')
        $('.form').hide()
        $('.hide').hide()
        $('.down').show()
      })
  },

  render: async () => {
    // Prevent double render
    if (App.loading) {
      return
    }

    // Update title and header with app name
    $(document).prop('title', App.name)
    $('.navbar-brand').text(App.name)

    // Update app loading state
    App.setLoading(true)

    // Check every 30 seconds if server is still alive
    setInterval(App.pollConnection(), 30000)

    // Update loading state
    App.setLoading(false)
  },

  renderBots: async () => {
    App.token = $('#token').val()
    const $botTemplate = $('.botTemplate')
    await axios.get(`${App.endpoint}api/bot/all`, { headers: { Authorization: `Bearer ${App.token}` } })
      .then((res) => {
        App.showform = false
        $('.form').hide()
        $('.table').show()
        for(const bot of res.data) {
          const $newBotTemplate = $botTemplate.clone()
          $newBotTemplate.find('.id').html(bot.id)
          $newBotTemplate.find('.name').html(bot.name)
          $newBotTemplate.find('.status').html(bot.status ? '<span class="badge badge-success">Online</span>' : '<span class="badge badge-danger">Offline</span>')
          $newBotTemplate.find('.last_updated').html(moment(bot.updated_at).fromNow())
          $newBotTemplate.find('#cyclebtn').text(bot.status ? 'Stop' : 'Start').addClass(`btn-${bot.status ? 'warning' : 'success'}`)
          $('.botList').append($newBotTemplate)
          $newBotTemplate.show()
        }
        $(document).on('click', 'button#cyclebtn', function() {

          // Point to grab ID for usage $(this).parent().parent().parent().children('.id').text()
          console.log($(this).parent().parent().parent().children('.id').text())

          // This doesn't actually do anything with the API it just updates the view to represent how the functionality may work
          $(this).parent().parent().parent().children('.status').children('.badge').text($(this).parent().parent().parent().children('.status').children('.badge').text() === 'Online' ? 'Offline' : 'Online').addClass(`badge-${$(this).parent().parent().parent().children('.status').children('.badge').text() === 'Online' ? 'success' : 'danger'}`).removeClass(`badge-${$(this).parent().parent().parent().children('.status').children('.badge').text() === 'Online' ? 'danger' : 'success'}`)
          $(this).text($(this).parent().parent().parent().children('.status').children('.badge').text() === 'Online' ? 'Stop' : 'Start').addClass(`btn-${$(this).parent().parent().parent().children('.status').children('.badge').text() === 'Online' ? 'warning' : 'success'}`).removeClass(`btn-${$(this).parent().parent().parent().children('.status').children('.badge').text() === 'Online' ? 'success' : 'warning'}`)
        })
        $(document).on('click', 'button#deletebtn', function() {
          $(this).parent().parent().parent().remove()
        })
      })
      .catch((err) => {
        console.log(err)
      })
  },

  setLoading: (boolean) => {
    App.loading = boolean
    const loader = $('#loader')
    const content = $('#content')
    if (boolean) {
      loader.show()
      content.hide()
    } else {
      loader.hide()
      content.show()
    }
  }

}

$(() => {
  $(window).load(() => {
    App.load()
  })
})
