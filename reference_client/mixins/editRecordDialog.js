import sharedService from '~/services/shared.js'
import { executeJomql } from '~/services/jomql.js'

export default {
  props: {
    status: {
      type: Boolean,
    },

    selectedItem: {
      type: Object,
      default: () => ({}),
    },

    recordInfo: {
      type: Object,
      required: true,
    },

    addMode: {
      type: Boolean,
      default: false,
    },

    viewMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      inputs: {},

      inputOptions: {},
      loading: {
        editRecord: false,
        loadRecord: false,
      },
    }
  },

  computed: {
    capitalizedType() {
      return sharedService.capitalizeString(this.recordInfo.type)
    },
    title() {
      return (
        (this.addMode ? 'New' : this.viewMode ? 'View' : 'Edit') +
        ' ' +
        this.capitalizedType
      )
    },
    icon() {
      return this.addMode
        ? 'mdi-plus'
        : this.viewMode
        ? 'mdi-eye'
        : 'mdi-pencil'
    },
    validInputs() {
      const returnObject = {}
      for (const prop in this.recordInfo.inputs) {
        if (
          this.recordInfo.inputs[prop][this.addMode ? 'addable' : 'editable']
        ) {
          returnObject[prop] = this.recordInfo.inputs[prop]
        }
      }
      return returnObject
    },
  },

  watch: {
    status() {
      this.reset()
    },
  },

  methods: {
    close() {
      this.$emit('close')
    },

    async submit() {
      this.loading.editRecord = true
      try {
        const data = await executeJomql(
          (this.addMode ? 'create' : 'update') + this.capitalizedType,
          {
            id: true,
          },
          {
            ...(!this.addMode && { id: this.selectedItem.id }),
            ...this.inputs,
          }
        )

        this.$notifier.showSnackbar({
          message:
            this.capitalizedType + (this.addMode ? ' Added' : ' Updated'),
          variant: 'success',
        })

        this.$emit('submit', data)

        this.close()
      } catch (err) {
        sharedService.handleError(err, this.$root)
      }
      this.loading.editRecord = false
    },

    async loadRecord() {
      this.loading.loadRecord = true
      try {
        const data = await executeJomql(
          'get' + this.capitalizedType,
          {
            id: true,
            ...Object.keys(this.recordInfo.inputs).reduce((total, item) => {
              total[item] = true
              return total
            }, {}),
          },
          {
            id: this.selectedItem.id,
          }
        )

        this.inputs = Object.keys(this.recordInfo.inputs).reduce(
          (total, item) => {
            this.$set(total, item, data[item])
            return total
          },
          {}
        )
      } catch (err) {
        sharedService.handleError(err, this.$root)
      }
      this.loading.loadRecord = false
    },

    reset() {
      if (!this.status) return

      // load dropdowns
      for (const prop in this.recordInfo.inputs) {
        if (this.recordInfo.inputs[prop].getOptions) {
          this.recordInfo.inputs[prop]
            .getOptions()
            .then((res) => this.$set(this.inputOptions, prop, res))
        }
      }

      if (this.addMode) {
        this.inputs = {
          ...Object.keys(this.recordInfo.inputs).reduce((total, item) => {
            this.$set(
              total,
              item,
              this.recordInfo.inputs[item].default
                ? this.recordInfo.inputs[item].default()
                : null
            )
            return total
          }, {}),
          ...this.selectedItem,
        }
      } else {
        this.loadRecord()
      }
    },
  },
}
