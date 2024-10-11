// List of metro stations (including both Green and Purple Lines)
const stations = [
    "Nagasandra", "Dasarahalli", "Jalahalli", "Peenya Industry", "Peenya",
    "Goraguntepalya", "Yeshwanthpur", "Sandal Soap Factory", "Mahalakshmi",
    "Rajajinagar", "Mahakavi Kuvempu Road", "Srirampura", "Mantri Square Sampige Road",
    "Nadaprabhu Kempegowda Station", "Kantivira Sangoli Rayanna Railway Station", "Majestic", "Magadi Road", "Hosahalli",
    "Vijayanagar", "Attiguppe", "Deepanjali Nagar", "Mysore Road",
    "Nayandahalli", "Rajarajeshwari Nagar", "Jnanabharathi", "Pattanagere",
    "Kengeri Bus Terminal", "Kengeri", "Baiyappanahalli", "Swami Vivekananda Road", "Indiranagar", "Halasuru",
    "Trinity", "Mahatma Gandhi Road", "Cubbon Park", "Vidhana Soudha",
    "Sir M. Visvesvaraya Station, Central College", "Chickpete", "Krishna Rajendra Market",
    "National College", "Lalbagh", "South End Circle", "Jayanagar",
    "Rashtriya Vidyalaya Road", "Banashankari", "Jaya Prakash Nagar",
    "Yelachenahalli", "Konanakunte Cross", "Doddakallasandra", "Vajrahalli",
    "Thalaghattapura", "Silk Institute"
];

// Adjacency matrix for the metro network
const metroGraph = Array.from({ length: stations.length }, () => Array(stations.length).fill(0));

// Fill adjacency matrix with direct connections
const addEdge = (src, dest) => {
    metroGraph[src][dest] = 1;
    metroGraph[dest][src] = 1; // undirected graph
};


const edges = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8],
    [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 15],
    [15, 16], [16, 17], [17, 18], [18, 19], [19, 20], [20, 21], [21, 22],
    [22, 23], [23, 24], [24, 25], [26, 27], [27, 28], [28, 29], [29, 30],
    [30, 31], [31, 32], [32, 33], [33, 34], [34, 35], [35, 36], [36, 37],
    [37, 38], [38, 39], [39, 40], [40, 41], [41, 42], [42, 43], [43, 44],
    [44, 45], [45, 46], [46, 47], [47, 48], [48, 49], [49, 50], [50, 51],
    [13, 35] // Interchange
];

edges.forEach(edge => addEdge(edge[0], edge[1]));


const dijkstra = (src, dest) => {
    const n = metroGraph.length;
    const dist = Array(n).fill(Infinity);
    const prev = Array(n).fill(-1);
    const visited = Array(n).fill(false);

    dist[src] = 0;

    for (let i = 0; i < n - 1; i++) {
        const u = minDistance(dist, visited);
        visited[u] = true;

        for (let v = 0; v < n; v++) {
            if (!visited[v] && metroGraph[u][v] !== 0 &&
                dist[u] !== Infinity && dist[u] + metroGraph[u][v] < dist[v]) {
                dist[v] = dist[u] + metroGraph[u][v];
                prev[v] = u; 
            }
        }
    }

    showResult(dist, prev, dest);
};


const minDistance = (dist, visited) => {
    let min = Infinity;
    let minIndex = -1;

    for (let v = 0; v < dist.length; v++) {
        if (!visited[v] && dist[v] <= min) {
            min = dist[v];
            minIndex = v;
        }
    }
    return minIndex;
};


const showResult = (dist, prev, dest) => {
    const resultContainer = document.getElementById("result");
    if (dist[dest] === Infinity) {
        resultContainer.innerHTML = "No path found!";
        return;
    }

    const path = getPath(prev, dest);
    resultContainer.innerHTML = `Minimum Number of Stations: ${dist[dest]}<br>Path: ${path}`;
    drawPath(path);
};


const getPath = (prev, j) => {
    if (j === -1) return "";
    const path = [];
    while (j !== -1) {
        path.push(stations[j]);
        j = prev[j]; 
    }
    path.reverse(); 
    return path.join(" -> "); 
};


const drawPath = (path) => {
    const canvas = document.getElementById("pathCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "16px Arial";
    ctx.fillStyle = "black";

    const stepSize = canvas.width / (path.length + 1);
    for (let i = 0; i < path.length; i++) {
        ctx.fillText(path[i], (i + 1) * stepSize, canvas.height / 2);
        if (i > 0) {
            ctx.beginPath();
            ctx.moveTo(i * stepSize, canvas.height / 2);
            ctx.lineTo((i + 1) * stepSize, canvas.height / 2);
            ctx.stroke();
        }
    }
};


document.getElementById("findPathButton").addEventListener("click", () => {
    const sourceInput = document.getElementById("source").value.trim(); 
    const destinationInput = document.getElementById("destination").value.trim(); 

    const sourceIndex = stations.findIndex(station => station.toLowerCase() === sourceInput.toLowerCase());
    const destinationIndex = stations.findIndex(station => station.toLowerCase() === destinationInput.toLowerCase());

    console.log(`Source Index: ${sourceIndex}, Destination Index: ${destinationIndex}`); 
    
    if (sourceIndex === -1 || destinationIndex === -1) {
        alert("Please enter valid station names.");
        return;
    }

    dijkstra(sourceIndex, destinationIndex);
});
