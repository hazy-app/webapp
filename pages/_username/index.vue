<script>
export default {
  asyncData({ redirect, params }) {
    return redirect(`/${params.username}/questions`)
  }
}
</script>
