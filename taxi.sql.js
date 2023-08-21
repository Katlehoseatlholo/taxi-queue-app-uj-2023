import * as sqlite from "sqlite";
import sqlite3 from "sqlite3";

const db = await sqlite.open({
  filename: "./taxi_queue.db",
  driver: sqlite3.Database,
});

await db.migrate();

export async function joinQueue() {
  // Insert a new passenger into the queue
  await db.run("INSERT INTO taxi_queue (passenger_queue_count) VALUES (1)");
  await db.run("UPDATE taxi_queue SET passenger_queue_count = passenger_queue_count + 1");

}

export async function leaveQueue() {
  // Remove the passenger with the lowest id
  await db.run(
    "DELETE FROM taxi_queue WHERE id = (SELECT MIN(id) FROM taxi_queue WHERE passenger_queue_count > 0)"
  );
   // Decrement the passenger_queue_count by 1
   await db.run("UPDATE taxi_queue SET passenger_queue_count = passenger_queue_count - 1");

}

export async function queueLength() {
  // Calculate and return the number of passengers in the queue
  const result = await db.get(
    "SELECT SUM(passenger_queue_count) AS count FROM taxi_queue"
  );
  return result.count || 0;
}

export async function joinTaxiQueue() {
  // Insert a new taxi into the queue
  await db.run("INSERT INTO taxi_queue (taxi_queue_count) VALUES (1)");
}

export async function taxiQueueLength() {
  // Calculate and return the number of taxis in the queue
  const result = await db.get(
    "SELECT SUM(taxi_queue_count) AS count FROM taxi_queue"
  );
  return result.count || 0;
}
export async function taxiDepart() {
    const taxiCount = await taxiQueueLength();
    const passengerCount = await queueLength();
  
    if (taxiCount > 0) {
      // Calculate the number of taxis that can depart
      const taxisToDepart = Math.min(taxiCount, passengerCount >= 12 ? taxiCount : 0);

      console.log(taxisToDepart);
  
      if (taxisToDepart > 0) {
        // Remove taxis from the queue
        await db.run(
          `UPDATE taxi_queue SET taxi_queue_count = taxi_queue_count - ${taxisToDepart} WHERE id IN (SELECT id FROM taxi_queue WHERE taxi_queue_count > 0 LIMIT ${taxisToDepart})`
        );
  
        // Remove passengers from the queue
        await db.run(
          `UPDATE taxi_queue SET passenger_queue_count = passenger_queue_count - ${taxisToDepart} WHERE id IN (SELECT id FROM taxi_queue WHERE passenger_queue_count > 0 LIMIT ${taxisToDepart})`
        );
      }
    }
  }
  
