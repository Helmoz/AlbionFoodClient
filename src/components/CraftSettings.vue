<template>
  <q-card>
    <q-card-section>
      <div class="row q-gutter-md items-center">
        <div class="col-xs-12 col-sm-3">
          <q-select outlined v-model="city" :options="cityOptions" label="Город" />
        </div>
        <div class="col-xs-12 col-sm-3 text-center">
          <q-checkbox size="md" v-model="focusUsage" left-label label="Использовать очки фокуса" />
        </div>
        <div class="col-xs-12 col-sm-2">
          <q-input
            v-if="focusUsage"
            v-model="focusPoints"
            debounce="500"
            label="Количество очков фокуса"
          />
          <q-input v-else v-model="itemsCount" debounce="500" label="Количество предметов" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { useStore } from '../composition/use-store'
import { useCraftSettings } from '../composition/CraftSettings'

export default {
  setup() {
    const cityOptions = [
      'Bridgewatch',
      'Caerleon',
      'Martlock',
      'Thetford',
      'Fort Sterling',
      'Lymhurst'
    ]

    const store = useStore()

    return {
      ...useCraftSettings(store),
      cityOptions
    }
  }
}
</script>
