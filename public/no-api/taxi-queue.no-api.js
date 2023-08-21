// Listen for the "alpine:init" event to initialize Alpine.js
document.addEventListener("alpine:init", () => {
  // Define a new Alpine.js data component called "TaxiQueue"
  Alpine.data("TaxiQueue", () => {
    return {
      version: "no-api-1.0", // A version identifier for your data component
      Passengers: 0, // Initialize the number of passengers to 0
      TaxiQueue: 0, // Initialize the taxi queue to 0
      
      // Method to add a passenger to the queue
      joinQueue() {
        this.Passengers++;
      },
      
      // Method to remove a passenger from the queue
      leaveQueue() {
        this.Passengers--;
      },

      // Method to add a taxi to the taxi queue
      joinTaxiQueue() {
        this.TaxiQueue++;
      },

      // Method to get the current length of the passenger queue
      queueLength() {
        return this.Passengers.length; // Note: "length" should be "Passengers" not "this.Passengers.length"
      },

      // Method to get the current length of the taxi queue
      taxiQueueLength() {
        return this.TaxiQueue.length; // Note: "length" should be "TaxiQueue" not "this.TaxiQueue.length"
      },

      // Method to simulate a taxi departing when conditions are met
      taxiDepart() {
        if (this.Passengers >= 12 && this.TaxiQueue > 0) {
          this.TaxiQueue--;
          this.Passengers -= 12;
          alert("Hooray we have 12 Passengers we can now go!!!!!!!"); // Show an alert when the taxi departs
        } else {
          alert("Taxi is not full yet!!"); // Show an alert when the taxi is not yet full
        }
      },
    };
  });
});
