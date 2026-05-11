import { db, doc, updateDoc, increment, setDoc, getDoc, onSnapshot } from './firebase-config.js';

async function trackVisitor() {
    const hostname = window.location.hostname;
    const isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';

    if (isLocal) {
        console.log('Visitor tracking skipped on localhost');
        fetchAndDisplayCount();
        return;
    }

    // Check if we already counted this session to avoid double counting on refresh
    if (sessionStorage.getItem('visited')) {
        fetchAndDisplayCount();
        return;
    }

    const visitorDocRef = doc(db, 'stats', 'visitors');

    try {
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
        sessionStorage.setItem('visited', 'true');
    } catch (error) {
        console.error('Error updating visitor count:', error);
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
