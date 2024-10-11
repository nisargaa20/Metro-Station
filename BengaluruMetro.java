import java.util.*;

// Main Class to represent the Metro Graph
public class BengaluruMetro {
    // List of metro stations (including both Green and Purple Lines)
    private static String[] stations = {
        // Green Line
        "Nagasandra", "Dasarahalli", "Jalahalli", "Peenya Industry", "Peenya", 
        "Goraguntepalya", "Yeshwanthpur", "Sandal Soap Factory", "Mahalakshmi", 
        "Rajajinagar", "Mahakavi Kuvempu Road", "Srirampura", "Mantri Square Sampige Road", 
        "Nadaprabhu Kempegowda Station",  "Kantivira Sangoli Rayanna Railway Station","Majestic", "Magadi Road", "Hosahalli", 
        "Vijayanagar", "Attiguppe", "Deepanjali Nagar", "Mysore Road", 
        "Nayandahalli", "Rajarajeshwari Nagar", "Jnanabharathi", "Pattanagere", 
        "Kengeri Bus Terminal", "Kengeri",

        // Purple Line
        "Baiyappanahalli", "Swami Vivekananda Road", "Indiranagar", "Halasuru", 
        "Trinity", "Mahatma Gandhi Road", "Cubbon Park", "Vidhana Soudha", 
        "Sir M. Visvesvaraya Station, Central College", "Chickpete","Krishna Rajendra Market", 
        "National College", "Lalbagh", "South End Circle", "Jayanagar", 
        "Rashtriya Vidyalaya Road", "Banashankari", "Jaya Prakash Nagar", 
        "Yelachenahalli", "Konanakunte Cross", "Doddakallasandra", "Vajrahalli", 
        "Thalaghattapura", "Silk Institute"
    };

    // Adjacency matrix for the metro network
    private static int[][] metroGraph = new int[stations.length][stations.length];

    // Fill adjacency matrix with direct connections
    static {
        // Initialize all connections with 0 (no direct connection)
        for (int i = 0; i < stations.length; i++) {
            Arrays.fill(metroGraph[i], 0);
        }

        addEdge(0, 1);  // Nagasandra -> Dasarahalli
addEdge(1, 2);  // Dasarahalli -> Jalahalli
addEdge(2, 3);  // Jalahalli -> Peenya Industry
addEdge(3, 4);  // Peenya Industry -> Peenya
addEdge(4, 5);  // Peenya -> Goraguntepalya
addEdge(5, 6);  // Goraguntepalya -> Yeshwanthpur
addEdge(6, 7);  // Yeshwanthpur -> Sandal Soap Factory
addEdge(7, 8);  // Sandal Soap Factory -> Mahalakshmi
addEdge(8, 9);  // Mahalakshmi -> Rajajinagar
addEdge(9, 10); // Rajajinagar -> Mahakavi Kuvempu Road
addEdge(10, 11); // Mahakavi Kuvempu Road -> Srirampura
addEdge(11, 12); // Srirampura -> Mantri Square Sampige Road
addEdge(12, 13); // Mantri Square Sampige Road -> Nadaprabhu Kempegowda Station, Majestic (Interchange with Purple Line)
addEdge(13, 14); // Majestic (Interchange) -> Magadi Road
addEdge(14, 15); // Magadi Road -> Hosahalli
addEdge(15, 16); // Hosahalli -> Vijayanagar
addEdge(16, 17); // Vijayanagar -> Attiguppe
addEdge(17, 18); // Attiguppe -> Deepanjali Nagar
addEdge(18, 19); // Deepanjali Nagar -> Mysore Road
addEdge(19, 20); // Mysore Road -> Nayandahalli
addEdge(20, 21); // Nayandahalli -> Rajarajeshwari Nagar
addEdge(21, 22); // Rajarajeshwari Nagar -> Jnanabharathi
addEdge(22, 23); // Jnanabharathi -> Pattanagere
addEdge(23, 24); // Pattanagere -> Kengeri Bus Terminal
addEdge(24, 25); // Kengeri Bus Terminal -> Kengeri

addEdge(26, 27); // Baiyappanahalli -> Swami Vivekananda Road
addEdge(27, 28); // Swami Vivekananda Road -> Indiranagar
addEdge(28, 29); // Indiranagar -> Halasuru
addEdge(29, 30); // Halasuru -> Trinity
addEdge(30, 31); // Trinity -> Mahatma Gandhi Road
addEdge(31, 32); // Mahatma Gandhi Road -> Cubbon Park
addEdge(32, 33); // Cubbon Park -> Vidhana Soudha
addEdge(33, 34); // Vidhana Soudha -> Sir M. Visvesvaraya Station, Central College
addEdge(34, 35); // Sir M. Visvesvaraya Station, Central College -> Nadaprabhu Kempegowda Station, Majestic (Interchange with Green Line)
addEdge(35, 36); // Nadaprabhu Kempegowda Station ->Chickpete

addEdge(36, 37); // Chickpete -> Krishna 
addEdge(37, 38); // Krishna  -> National College
addEdge(38, 39); // National College -> Lalbagh
addEdge(39, 40); // Lalbagh -> South End Circle
addEdge(40, 41); // South End Circle -> Jayanagar
addEdge(41, 42);
addEdge(42, 43); // Jayanagar -> Rashtriya Vidyalaya Road
addEdge(43, 44); // Rashtriya Vidyalaya Road -> Banashankari
addEdge(44, 45); // Banashankari -> Jaya Prakash Nagar
addEdge(45, 46); // Jaya Prakash Nagar -> Yelachenahalli
addEdge(46, 47); // Yelachenahalli -> Konanakunte Cross
addEdge(47, 48); // Konanakunte Cross -> Doddakallasandra
addEdge(48, 49);  // Doddakallasandra -> Vajrahalli
addEdge(49, 50);  // Vajrahalli -> Thalaghattapura
addEdge(50, 51);// Thalaghattapura -> Silk Institute
addEdge(13, 35);  // Nadaprabhu Kempegowda Station (Green Line) <-> Nadaprabhu Kempegowda Station (Purple Line)

    }

    // Function to add a direct edge (bidirectional)
    // Function to add a direct edge (bidirectional)
    private static void addEdge(int src, int dest) {
        metroGraph[src][dest] = 1;
        metroGraph[dest][src] = 1; // since it's an undirected graph
    }

    // Function to find the shortest path using Dijkstra's algorithm
    private static void dijkstra(int src, int dest) {
        int n = metroGraph.length;
        int[] dist = new int[n];
        boolean[] visited = new boolean[n];
        int[] prev = new int[n]; // To track the path

        // Initialize distances to infinity and visited to false
        Arrays.fill(dist, Integer.MAX_VALUE);
        Arrays.fill(prev, -1); // Initialize previous nodes
        dist[src] = 0;

        for (int i = 0; i < n - 1; i++) {
            int u = minDistance(dist, visited);
            visited[u] = true;

            for (int v = 0; v < n; v++) {
                if (!visited[v] && metroGraph[u][v] != 0 &&
                    dist[u] != Integer.MAX_VALUE && dist[u] + metroGraph[u][v] < dist[v]) {
                    dist[v] = dist[u] + metroGraph[u][v];
                    prev[v] = u; // Store the previous node
                }
            }
        }

        // Print the shortest distance from the source to the destination
        System.out.println("Minimum Number of Stations from " + stations[src] + " To " + stations[dest] + ": " + dist[dest]);

        // Print the path from source to destination
        System.out.print("Path: ");
        printPath(prev, dest);
        System.out.println();
    }

    // Function to find the node with the minimum distance
    private static int minDistance(int[] dist, boolean[] visited) {
        int min = Integer.MAX_VALUE;
        int minIndex = -1;

        for (int v = 0; v < dist.length; v++) {
            if (!visited[v] && dist[v] <= min) {
                min = dist[v];
                minIndex = v;
            }
        }
        return minIndex;
    }

// Function to print the path from source to destination
private static void printPath(int[] prev, int j) {
    if (j == -1) return; // Base case
    List<String> path = new ArrayList<>();
    while (j != -1) {
        path.add(stations[j]);
        j = prev[j]; // Move to the previous station
    }
    Collections.reverse(path); // Reverse the list to get the correct order
    System.out.print(String.join(", ", path)); // Join with commas
}

    // Main method to run the program
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Prompt for source station
        System.out.print("Enter source station: ");
        String source = scanner.nextLine();

        // Find source index
        int srcIndex = getStationIndex(source);
        if (srcIndex == -1) {
            System.out.println("Invalid source station. Please try again.");
            return;
        }

        // Prompt for destination station
        System.out.print("Enter destination station: ");
        String destination = scanner.nextLine();

        // Find destination index
        int destIndex = getStationIndex(destination);
        if (destIndex == -1) {
            System.out.println("Invalid destination station. Please try again.");
            return;
        }

        // Call Dijkstra's algorithm to find the shortest path
        dijkstra(srcIndex, destIndex);

        scanner.close();
    }

    // Function to get the index of a station by name
    private static int getStationIndex(String stationName) {
        for (int i = 0; i < stations.length; i++) {
            if (stations[i].equalsIgnoreCase(stationName)) {
                return i;
            }
        }
        return -1; // Return -1 if station not found
    }
}


