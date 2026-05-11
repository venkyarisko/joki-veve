import { db, doc, updateDoc, increment, setDoc, getDoc, onSnapshot, serverTimestamp } from './firebase-config.js';

async function trackVisitor() {
    const hostname = window.location.hostname;
    const isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';

    if (isLocal) {
        console.log('Visitor tracking skipped on localhost');
        fetchAndDisplayCount();
        return;
    }

    const visitedKey = 'visited_v2'; // Changed key to reset for testing
    const sessionVisited = sessionStorage.getItem(visitedKey);

    try {
        console.log("Visitor Tracker: Fetching IP...");
        // Fetch IP address
        const ipRes = await fetch('https://api.ipify.org?format=json');
        const { ip } = await ipRes.json();
        console.log("Visitor Tracker: IP found", ip);
        
        // Log IP visit
        const ipDocRef = doc(db, 'visitor_logs', ip.replace(/\./g, '-'));
        const ipSnap = await getDoc(ipDocRef);
        
        console.log("Visitor Tracker: Syncing IP log to Firebase...");
        
        if (ipSnap.exists()) {
            await updateDoc(ipDocRef, {
                visit_count: increment(1),
                last_visit: serverTimestamp()
            });
        } else {
            await setDoc(ipDocRef, {
                ip: ip,
                visit_count: 1,
                first_visit: serverTimestamp(),
                last_visit: serverTimestamp()
            });
        }

        // Increment total visitors (only once per session)
        if (!sessionVisited) {
            const visitorDocRef = doc(db, 'stats', 'visitors');
            const docSnap = await getDoc(visitorDocRef);
            if (docSnap.exists()) {
                await updateDoc(visitorDocRef, {
                    count: increment(1)
                });
            } else {
                await setDoc(visitorDocRef, {
                    count: 1
                });
            }
            sessionStorage.setItem(visitedKey, 'true');
        }
        console.log("Visitor Tracker: Success!");
    } catch (error) {
        console.error('Error tracking visitor:', error);
    } finally {
        fetchAndDisplayCount();
    }
}

function fetchAndDisplayCount() {
    const el = document.getElementById('stat-visitors');
    
    if (!el) {
        // Retry in 500ms if element not found yet (e.g. footer still rendering)
        setTimeout(fetchAndDisplayCount, 500);
        return;
    }

    const visitorDocRef = doc(db, 'stats', 'visitors');
    onSnapshot(visitorDocRef, (docSnap) => {
        if (docSnap.exists()) {
            const count = docSnap.data().count || 0;
            el.setAttribute('data-target', count);
            
            // Update value
            el.innerText = count.toLocaleString('id-ID');
        }
    });
}

// Function to listen to visitor count (for dashboard)
export function listenToVisitors(callback) {
    const visitorDocRef = doc(db, 'stats', 'visitors');
    return onSnapshot(visitorDocRef, (docSnap) => {
        if (docSnap.exists()) {
            callback(docSnap.data().count);
        } else {
            callback(0);
        }
    });
}

// Initialize tracking
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => trackVisitor());
} else {
    trackVisitor();
}
