document.addEventListener("alpine:init", () => {
  // Initialize Alpine.js data for the TaxiQueue component
  Alpine.data("TaxiQueue", () => {
    return {
      version: "api-1.0",
      queueLength: 0, // Initialize queueLength to null
      Taxis: 0, // Initialize Taxis to null
      Passengers: 0, // Initialize Passengers to null,

      // Initialization method
      init() {
        // Make an example API call to get the initial queue length
        axios.get("/api/passenger/queue").then((response) => {
          console.log(response.data.queueCount);
          this.queueLength = response.data.queueCount; // Update queueLength based on the API response
        });
        axios.get("/api/taxi/queue").then((response) => {
          this.Taxis = response.data.taxiQueueCount; // Update Taxis based on the API response
        });
      },

      // Function to join the Passenger queue
      joinQueue() {
        axios
          .post("/api/passenger/join")
          .then((response) => {
            // Handle the successful response here
            this.queueLength = response.data.queueCount;
            alert("Successfully joined the Passenger queue");
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      },

      // Function to leave the Passenger queue
      leaveQueue() {
        axios
          .post("/api/passenger/leave")
          .then((response) => {
            // Handle the successful response here
            this.queueLength = response.data.queueCount;
            alert("Successfully left the Passenger queue");
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      },

      // Function to join the Taxi queue
      joinTaxiQueue() {
        axios
          .post("/api/taxi/join")
          .then((response) => {
            // Handle the successful response here
            this.Taxis = response.data.taxiQueueCount;
            alert("Successfully joined the Taxi queue");
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      },

      // Function to simulate a taxi departure
      taxiDepart() {
        axios
          .post("/api/taxi/depart")
          .then((response) => {
            // Handle the successful response here
            if ( this.Taxis > 0) {
              this.Taxis--;
              this.queueLength -= 12;
              alert("Hooray Cape Town here we go");
            } else {
              alert("We are not ready to go");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      },
    };
  });
});
