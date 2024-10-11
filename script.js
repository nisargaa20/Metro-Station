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

const dijkstra = (src) => {
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

    return { dist, prev };
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

// Show the path to the selected destination
const showResult = (dist, prev, src, dest) => {
    const resultContainer = document.getElementById("result");
    resultContainer.innerHTML = ""; 

    if (dist[dest] === Infinity) {
        resultContainer.innerHTML = `<p>No path to ${stations[dest]}!</p>`;
    } else {
        const path = getPath(prev, dest);
        resultContainer.innerHTML = `<p>Shortest path to <b>${stations[dest]}</b>: ${dist[dest]} stations, Path: ${path}</p>`;
    }
};

// Show the results for all destinations
const showAllResults = (dist, prev, src) => {
    const resultContainer = document.getElementById("result");
    resultContainer.innerHTML = ""; 

    for (let i = 0; i < dist.length; i++) {
        if (i === src) continue; 

        if (dist[i] === Infinity) {
            resultContainer.innerHTML += `<p>No path to ${stations[i]}!</p>`;
        } else {
            const path = getPath(prev, i);
            resultContainer.innerHTML += `<p>To <b>${stations[i]}</b>: ${dist[i]} stations, Path: ${path}</p>`;
        }
    }
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


document.getElementById("findPathButton").addEventListener("click", () => {
    const sourceInput = document.getElementById("source").value.trim();
    const destinationInput = document.getElementById("destination").value.trim();

    const sourceIndex = stations.findIndex(station => station.toLowerCase() === sourceInput.toLowerCase());
    const destinationIndex = stations.findIndex(station => station.toLowerCase() === destinationInput.toLowerCase());

    if (sourceIndex === -1) {
        alert("Please enter a valid source station name.");
        return;
    }

    const { dist, prev } = dijkstra(sourceIndex); 

    if (destinationInput && destinationIndex !== -1) {
        showResult(dist, prev, sourceIndex, destinationIndex); 
    } else {
        document.getElementById("showAllBtn").style.display = "block"; 
    }
});


document.getElementById("showAllBtn").addEventListener("click", () => {
    const sourceInput = document.getElementById("source").value.trim();
    const sourceIndex = stations.findIndex(station => station.toLowerCase() === sourceInput.toLowerCase());

    const { dist, prev } = dijkstra(sourceIndex);
    showAllResults(dist, prev, sourceIndex); 
});