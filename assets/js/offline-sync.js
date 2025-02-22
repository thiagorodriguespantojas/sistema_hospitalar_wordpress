;(($) => {
  // Declare jQuery if not already declared
  $ = $ || jQuery

  var offlineSync = {
    init: function () {
      this.setupOfflineDetection()
      this.setupFormInterception()
      this.setupSyncButton()
    },

    setupOfflineDetection: function () {
      // Import Offline.js library.  Ensure this is included in your project.
      // For example, via a <script> tag in your HTML: <script src="path/to/offline.min.js"></script>
      var Offline = window.Offline || {} //Fallback if Offline is not defined globally
      Offline.options = { checks: { xhr: { url: hospital_offline.ajax_url } } }
      Offline.on("up", this.onOnline.bind(this))
      Offline.on("down", this.onOffline.bind(this))
    },

    setupFormInterception: function () {
      $("form.offline-enabled").on("submit", this.handleFormSubmit.bind(this))
    },

    setupSyncButton: function () {
      $("#sync-offline-data").on("click", this.syncOfflineData.bind(this))
    },

    onOnline: function () {
      console.log("Connection is back online")
      this.syncOfflineData()
    },

    onOffline: () => {
      console.log("Connection is offline")
    },

    handleFormSubmit: function (e) {
      e.preventDefault()
      var $form = $(e.target)
      var formData = $form.serializeArray()
      var syncData = {
        sync_action: $form.data("sync-action"),
        table: $form.data("sync-table"),
        record_id: $form.data("sync-record-id") || 0,
        data: JSON.stringify(this.formArrayToObject(formData)),
      }

      if (Offline.state === "up") {
        this.submitForm($form)
      } else {
        this.saveOfflineData(syncData)
        alert("You are currently offline. Your data has been saved and will be synced when you are back online.")
      }
    },

    submitForm: ($form) => {
      $.ajax({
        url: $form.attr("action"),
        method: $form.attr("method"),
        data: $form.serialize(),
        success: (response) => {
          // Handle successful form submission
          console.log("Form submitted successfully", response)
        },
        error: (xhr, status, error) => {
          // Handle form submission error
          console.error("Form submission failed", error)
        },
      })
    },

    saveOfflineData: (syncData) => {
      var offlineData = JSON.parse(localStorage.getItem("offlineData")) || []
      offlineData.push(syncData)
      localStorage.setItem("offlineData", JSON.stringify(offlineData))
    },

    syncOfflineData: () => {
      var offlineData = JSON.parse(localStorage.getItem("offlineData")) || []
      if (offlineData.length === 0) {
        console.log("No offline data to sync")
        return
      }

      // Import hospital_offline object. Ensure this is available globally, perhaps via a PHP script.
      // Example in your PHP: wp_localize_script( 'your-script-handle', 'hospital_offline', array( 'ajax_url' => admin_url( 'admin-ajax.php' ), 'nonce' => wp_create_nonce( 'your-nonce-action' ) ) );
      var hospital_offline = window.hospital_offline || {} //Fallback if hospital_offline is not defined globally

      $.ajax({
        url: hospital_offline.ajax_url,
        method: "POST",
        data: {
          action: "process_offline_sync",
          nonce: hospital_offline.nonce,
          sync_data: JSON.stringify(offlineData),
        },
        success: (response) => {
          if (response.success) {
            localStorage.removeItem("offlineData")
            console.log("Offline data synced successfully", response.data)
          } else {
            console.error("Failed to sync offline data", response.data)
          }
        },
        error: (xhr, status, error) => {
          console.error("Error syncing offline data", error)
        },
      })
    },

    formArrayToObject: (formArray) => {
      var object = {}
      $.each(formArray, function () {
        if (object[this.name]) {
          if (!object[this.name].push) {
            object[this.name] = [object[this.name]]
          }
          object[this.name].push(this.value || "")
        } else {
          object[this.name] = this.value || ""
        }
      })
      return object
    },
  }

  $(document).ready(() => {
    offlineSync.init()
  })
})(jQuery)

