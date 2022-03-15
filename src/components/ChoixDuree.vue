<template>
    <form>
        <div class="form-row align-items-center">
          <div class="col-auto my-1">
            <label class="mr-sm-2 sr-only" for="inlineFormCustomSelect">Preference</label>
            <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
              <option selected>...</option>
              <option value="1">∞</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="3">4</option>
              <option value="3">5</option>
              <option value="3">6</option>
              <option value="3">7</option>
              <option value="3">8</option>
              <option value="3">9</option>
              <option value="3">10</option>               
            </select>
          </div>
        </div>
    </form>

</template>

<script>

export default {
  name: 'ChoixDuree',
  props: { /* Props  est un attribut que vous pouvez
              definir au niveau du composant qui sera
              transmis directement au template. */
    tit: String
  }
}
</script>