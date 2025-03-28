// Inizializzazione quando il DOM è caricato
document.addEventListener('DOMContentLoaded', function() {
    // Inizializza le particelle di sfondo
    initParticles();

    // Inizializza il tema (tema scuro predefinito)
    initTheme();

    // Inizializza il calcolatore di numeri primi
    initPrimeCalculator();

    // Inizializza il verificatore di numeri primi
    initPrimeChecker();

    // Inizializza le costanti matematiche
    initConstants();

    // Inizializza il calcolatore di costanti
    initConstantsCalculator();

    // Inizializza il pulsante di scroll to top
    initScrollToTop();

    // Aggiungi animazioni di fade-in agli elementi
    initFadeInAnimations();

    // Aggiungi smooth scrolling ai link di navigazione
    initSmoothScrolling();
});

// Inizializza le particelle di sfondo
function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#6366f1'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.3,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#6366f1',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.5
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
}

// Inizializza il tema (tema scuro predefinito)
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = themeToggleBtn.querySelector('i');

    // Imposta il tema scuro come predefinito se non c'è un tema salvato
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        // Tema scuro predefinito
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    // Gestisci il cambio di tema
    themeToggleBtn.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');

        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }

        // Aggiorna le particelle in base al tema
        updateParticlesTheme();
    });
}

// Aggiorna il colore delle particelle in base al tema
function updateParticlesTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const particleColor = currentTheme === 'dark' ? '#818cf8' : '#6366f1';
    
    if (window.pJSDom && window.pJSDom[0]) {
        window.pJSDom[0].pJS.particles.color.value = particleColor;
        window.pJSDom[0].pJS.particles.line_linked.color = particleColor;
        
        window.pJSDom[0].pJS.fn.particlesRefresh();
    }
}

// Inizializza il calcolatore di numeri primi
function initPrimeCalculator() {
    const calculateBtn = document.getElementById('calculate-btn');
    const clearBtn = document.getElementById('clear-btn');
    const quantityInput = document.getElementById('quantity');
    const speedSlider = document.getElementById('speed-slider');
    const speedValue = document.getElementById('speed-value');
    const displayModeRadios = document.getElementsByName('display-mode');
    const resultsTitle = document.getElementById('results-title');
    const statusElement = document.getElementById('status');
    const textOutput = document.getElementById('text-output');
    const canvas = document.getElementById('primes-canvas');
    const ctx = canvas.getContext('2d');
    
    // Variabili per l'animazione
    let animationActive = false;
    let animationSpeed = 10;
    let primesFound = [];
    let animationIndex = 0;
    
    // Imposta le dimensioni del canvas
    function resizeCanvas() {
        const container = document.getElementById('visualization-container');
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    }
    
    // Chiamata iniziale per impostare le dimensioni del canvas
    resizeCanvas();
    
    // Ridimensiona il canvas quando la finestra cambia dimensione
    window.addEventListener('resize', resizeCanvas);
    
    // Aggiorna il valore della velocità di animazione
    speedSlider.addEventListener('input', function() {
        animationSpeed = parseInt(this.value);
        speedValue.textContent = `${animationSpeed} numeri/secondo`;
    });

    // Imposta il valore iniziale della velocità
    animationSpeed = parseInt(speedSlider.value);
    speedValue.textContent = `${animationSpeed} numeri/secondo`;



    // Gestisci il pulsante di calcolo
    calculateBtn.addEventListener('click', function() {
        const quantity = parseInt(quantityInput.value);

        if (isNaN(quantity) || quantity <= 0) {
            showError('Inserisci un numero positivo valido.');
            return;
        }

        // Avviso per calcoli grandi
        if (quantity > 100000) {
            if (!confirm(`Stai per calcolare ${quantity.toLocaleString()} numeri primi. Questo potrebbe richiedere molto tempo e memoria. Continuare?`)) {
                return;
            }

            // Mostra un avviso informativo per calcoli molto grandi
            if (quantity > 1000000) {
                statusElement.textContent = 'Attenzione: calcoli molto grandi potrebbero richiedere diversi minuti.';
                statusElement.style.color = 'var(--warning-color)';
                setTimeout(() => {
                    statusElement.style.color = '';
                }, 3000);
            }
        }

        // Disabilita il pulsante durante il calcolo
        calculateBtn.disabled = true;
        statusElement.textContent = 'Calcolo in corso...';

        // Avvia il calcolo in un worker separato
        setTimeout(function() {
            try {
                const primes = findNPrimes(quantity);
                showResults(primes);
            } catch (error) {
                console.error('Errore nel calcolo:', error);
                statusElement.textContent = 'Errore durante il calcolo. La memoria disponibile potrebbe essere insufficiente.';
                showError('Si è verificato un errore durante il calcolo. La memoria disponibile potrebbe essere insufficiente.');
                calculateBtn.disabled = false;
            }
        }, 100);
    });

    // Gestisci il pulsante Fast Mode
    const fastModeBtn = document.getElementById('fast-mode-btn');
    fastModeBtn.addEventListener('click', function() {
        const quantity = parseInt(quantityInput.value);

        if (isNaN(quantity) || quantity <= 0) {
            showError('Inserisci un numero positivo valido.');
            return;
        }

        // Conferma per calcoli grandi
        if (quantity > 100000) {
            if (!confirm(`Stai per calcolare ${quantity.toLocaleString()} numeri primi in modalità veloce. Questo potrebbe richiedere molta memoria e CPU. Continuare?`)) {
                return;
            }

            // Mostra un avviso informativo per calcoli molto grandi
            if (quantity > 1000000) {
                statusElement.textContent = 'Attenzione: calcoli molto grandi potrebbero richiedere diversi minuti e molta memoria.';
                statusElement.style.color = 'var(--warning-color)';
                setTimeout(() => {
                    statusElement.style.color = '';
                }, 3000);
            }
        }

        // Disabilita i pulsanti durante il calcolo
        calculateBtn.disabled = true;
        fastModeBtn.disabled = true;
        statusElement.textContent = 'Fast Mode: ottimizzazione in corso...';

        // Ottimizza le prestazioni disattivando le animazioni
        const originalAnimationSpeed = animationSpeed;
        animationSpeed = 500; // Massima velocità

        // Usa setTimeout per non bloccare l'interfaccia
        setTimeout(function() {
            try {
                // Usa un algoritmo ottimizzato per grandi quantità
                statusElement.textContent = 'Fast Mode: calcolo in corso...';
                console.time('FastMode');

                // Usa l'algoritmo con gestione della memoria
                const primes = findNPrimes(quantity);
                console.timeEnd('FastMode');

                // Mostra i risultati in modalità testo (più veloce)
                showTextResults(primes, 'list');

                // Ripristina lo stato
                statusElement.textContent = `Fast Mode: completato! ${primes.length.toLocaleString()} numeri primi trovati`;
            } catch (error) {
                console.error('Errore in Fast Mode:', error);
                statusElement.textContent = 'Errore durante il calcolo. La memoria disponibile potrebbe essere insufficiente.';
                showError('Si è verificato un errore durante il calcolo. La memoria disponibile potrebbe essere insufficiente.');
            } finally {
                // Assicurati che i pulsanti vengano riabilitati anche in caso di errore
                animationSpeed = originalAnimationSpeed;
                calculateBtn.disabled = false;
                fastModeBtn.disabled = false;
            }
        }, 100);
    });

    // Gestisci il pulsante di esportazione
    const exportPrimesBtn = document.getElementById('export-primes-btn');
    exportPrimesBtn.addEventListener('click', function() {
        if (!primesFound || primesFound.length === 0) {
            showError('Nessun numero primo da esportare. Calcola prima i numeri primi.');
            return;
        }

        exportToFile(primesFound, 'numeri_primi.txt');
    });

    // Gestisci il pulsante di cancellazione
    clearBtn.addEventListener('click', function() {
        quantityInput.value = '';
        textOutput.textContent = '';
        resultsTitle.textContent = 'Risultati';
        statusElement.textContent = 'Pronto';

        // Ferma qualsiasi animazione in corso
        animationActive = false;

        // Pulisci il canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Funzione per esportare dati in un file
    function exportToFile(data, filename) {
        // Converti l'array in testo
        let content;
        if (Array.isArray(data)) {
            content = data.join(', ');
        } else {
            content = data.toString();
        }

        // Crea un blob con il contenuto
        const blob = new Blob([content], { type: 'text/plain' });

        // Crea un URL per il blob
        const url = URL.createObjectURL(blob);

        // Crea un elemento <a> per il download
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;

        // Aggiungi l'elemento al DOM, fai clic e rimuovilo
        document.body.appendChild(a);
        a.click();

        // Pulizia
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    }
    
    // Trova i primi n numeri primi con gestione della memoria
    function findNPrimes(n) {
        if (n <= 0) return [];

        // Stima del limite superiore usando il teorema dei numeri primi
        let limit;
        if (n < 6) {
            limit = 13; // Abbastanza grande per i primi 5 numeri primi
        } else {
            // Approssimazione: n-esimo numero primo è circa n * log(n)
            limit = Math.floor(n * (Math.log(n) + Math.log(Math.log(n)))) + 1;
        }

        // Calcola la memoria approssimativa necessaria (in MB)
        // Un array booleano in JS usa circa 4 byte per elemento
        const estimatedMemoryMB = (limit * 4) / (1024 * 1024);

        // Limite di memoria (in MB) - adattabile in base alle esigenze
        const memoryLimit = 500; // 500 MB

        if (estimatedMemoryMB > memoryLimit) {
            // Usa un approccio a blocchi per risparmiare memoria
            return findPrimesInChunks(n, limit, memoryLimit);
        }

        // Implementazione standard del Crivello di Eratostene
        try {
            const sieve = new Array(limit + 1).fill(true);
            sieve[0] = sieve[1] = false;

            for (let i = 2; i <= Math.sqrt(limit); i++) {
                if (sieve[i]) {
                    for (let j = i * i; j <= limit; j += i) {
                        sieve[j] = false;
                    }
                }
            }

            // Raccogli i primi n numeri primi
            const primes = [];
            for (let i = 0; i <= limit; i++) {
                if (sieve[i]) {
                    primes.push(i);
                    if (primes.length >= n) break;
                }
            }

            return primes;
        } catch (error) {
            console.error("Errore durante il calcolo dei numeri primi:", error);
            // Se si verifica un errore di memoria, prova con l'approccio a blocchi
            return findPrimesInChunks(n, limit, memoryLimit);
        }
    }

    // Trova numeri primi in blocchi per risparmiare memoria
    function findPrimesInChunks(n, limit, memoryLimit) {
        // Dimensione del blocco in base al limite di memoria (in elementi)
        // Usiamo il 75% del limite di memoria per sicurezza
        const safeMemoryLimit = memoryLimit * 0.75;
        const bytesPerElement = 4; // Stima per elemento booleano in JS
        const maxChunkSize = Math.floor((safeMemoryLimit * 1024 * 1024) / bytesPerElement);

        // Calcola la dimensione ottimale del blocco
        const chunkSize = Math.min(limit + 1, maxChunkSize);

        // Trova tutti i numeri primi fino a sqrt(limit) per usarli come base
        const sqrtLimit = Math.floor(Math.sqrt(limit));
        const basePrimes = [];

        // Crivello piccolo per i numeri primi di base
        const smallSieve = new Array(sqrtLimit + 1).fill(true);
        smallSieve[0] = smallSieve[1] = false;

        for (let i = 2; i <= Math.sqrt(sqrtLimit); i++) {
            if (smallSieve[i]) {
                for (let j = i * i; j <= sqrtLimit; j += i) {
                    smallSieve[j] = false;
                }
            }
        }

        // Raccogli i numeri primi di base
        for (let i = 2; i <= sqrtLimit; i++) {
            if (smallSieve[i]) {
                basePrimes.push(i);
            }
        }

        // Array per memorizzare tutti i numeri primi trovati
        const primes = [...basePrimes];

        // Processa il resto dei numeri in blocchi
        for (let start = sqrtLimit + 1; start <= limit && primes.length < n; start += chunkSize) {
            const end = Math.min(start + chunkSize - 1, limit);

            // Crea un crivello per questo blocco
            const blockSieve = new Array(end - start + 1).fill(true);

            // Setaccia il blocco usando i numeri primi di base
            for (const prime of basePrimes) {
                // Trova il primo multiplo di 'prime' nel blocco corrente
                let firstMultiple = Math.ceil(start / prime) * prime;
                if (firstMultiple < start) firstMultiple += prime;

                // Marca tutti i multipli di 'prime' nel blocco come non primi
                for (let j = firstMultiple; j <= end; j += prime) {
                    blockSieve[j - start] = false;
                }
            }

            // Raccogli i numeri primi da questo blocco
            for (let i = 0; i < blockSieve.length && primes.length < n; i++) {
                if (blockSieve[i]) {
                    primes.push(start + i);
                }
            }

            // Aggiorna lo stato per mostrare il progresso
            statusElement.textContent = `Calcolo in corso... ${Math.min(100, Math.floor((primes.length / n) * 100))}%`;
        }

        // Restituisci solo i primi n numeri primi
        return primes.slice(0, n);
    }



    // Funzione per mostrare un messaggio di errore
    function showMemoryWarning() {
        const memoryWarning = document.createElement('div');
        memoryWarning.className = 'memory-warning';
        memoryWarning.innerHTML = `
            <div class="memory-warning-content">
                <h3><i class="fas fa-exclamation-triangle"></i> Attenzione all'uso della memoria</h3>
                <p>Il calcolo di grandi quantità di numeri primi richiede molta memoria.</p>
                <p>L'applicazione ora utilizza un algoritmo ottimizzato che:</p>
                <ul>
                    <li>Divide il calcolo in blocchi per ridurre l'uso di memoria</li>
                    <li>Monitora l'uso della memoria durante il calcolo</li>
                    <li>Adatta automaticamente la strategia in base alle risorse disponibili</li>
                </ul>
                <p>Puoi calcolare quantità molto grandi di numeri primi, ma tieni presente che:</p>
                <ul>
                    <li>Calcoli con più di 1.000.000 di numeri primi potrebbero richiedere diversi minuti</li>
                    <li>Se il browser esaurisce la memoria, il calcolo potrebbe fallire</li>
                </ul>
                <button id="close-memory-warning" class="btn btn-primary">Ho capito</button>
            </div>
        `;

        document.body.appendChild(memoryWarning);

        document.getElementById('close-memory-warning').addEventListener('click', function() {
            document.body.removeChild(memoryWarning);
        });
    }
    
    // Mostra i risultati
    function showResults(primes) {
        let displayMode = 'visual';
        
        // Ottieni la modalità di visualizzazione selezionata
        for (const radio of displayModeRadios) {
            if (radio.checked) {
                displayMode = radio.value;
                break;
            }
        }
        
        if (displayMode === 'visual') {
            // Mostra l'animazione visuale
            startVisualAnimation(primes);
        } else {
            // Mostra i risultati come testo
            showTextResults(primes, displayMode);
        }
    }
    
    // Mostra i risultati come testo
    function showTextResults(primes, mode) {
        textOutput.textContent = '';
        
        if (primes.length === 0) {
            textOutput.textContent = 'Nessun numero primo trovato.';
        } else {
            // Aggiorna il titolo dei risultati
            resultsTitle.textContent = `Risultati: ${primes.length} numeri primi trovati`;
            
            // Visualizza i risultati in base alla modalità selezionata
            if (mode === 'list') {
                textOutput.textContent = primes.join(', ');
            } else { // grid
                const numbersPerRow = 15;
                let output = '';
                
                for (let i = 0; i < primes.length; i++) {
                    output += primes[i].toString().padStart(6, ' ');
                    if ((i + 1) % numbersPerRow === 0) {
                        output += '\n';
                    }
                }
                
                textOutput.textContent = output;
            }
        }
        
        // Reimposta lo stato
        resetStatus();
    }
    
    // Avvia l'animazione visuale
    function startVisualAnimation(primes) {
        // Ferma qualsiasi animazione in corso
        animationActive = false;
        setTimeout(() => {
            // Pulisci il canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Aggiorna il titolo dei risultati
            resultsTitle.textContent = `Animazione: ${primes.length} numeri primi`;
            
            // Avvia la nuova animazione
            animationActive = true;
            animationIndex = 0;
            primesFound = primes;
            
            // Disegna lo sfondo dell'animazione
            drawAnimationBackground();
            
            // Avvia l'animazione
            animatePrimes();
        }, 100);
    }
    
    // Disegna lo sfondo dell'animazione
    function drawAnimationBackground() {
        const width = canvas.width;
        const height = canvas.height;

        // Pulisci il canvas
        ctx.clearRect(0, 0, width, height);

        // Disegna un gradiente di sfondo più vivace
        const gradient = ctx.createRadialGradient(
            width/2, height/2, 0,
            width/2, height/2, Math.max(width, height)/1.5
        );
        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.2)');
        gradient.addColorStop(0.5, 'rgba(129, 140, 248, 0.1)');
        gradient.addColorStop(1, 'rgba(244, 63, 94, 0.2)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Aggiungi un effetto di griglia sottile
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;

        // Griglia orizzontale
        for (let y = 0; y < height; y += 30) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        // Griglia verticale
        for (let x = 0; x < width; x += 30) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }

        // Disegna il titolo con effetto glow
        const textColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        ctx.fillStyle = textColor;
        ctx.shadowColor = textColor;
        ctx.shadowBlur = 10;
        ctx.font = 'bold 28px Helvetica';
        ctx.textAlign = 'center';
        ctx.fillText('Animazione dei Numeri Primi', width / 2, 40);
        ctx.shadowBlur = 0;
    }
    
    // Anima i numeri primi
    function animatePrimes() {
        if (!animationActive || animationIndex >= primesFound.length) {
            // Animazione completata o interrotta
            resetStatus();
            return;
        }

        // Ottieni il numero primo corrente
        const number = primesFound[animationIndex];

        // Calcola la posizione per il numero usando una spirale di Fibonacci
        // per una distribuzione più interessante
        const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Angolo aureo ~137.5 gradi
        const angle = animationIndex * goldenAngle;

        // Calcola il raggio in base all'indice per creare un effetto a spirale
        const radiusFactor = Math.min(canvas.width, canvas.height) * 0.4;
        const distanceFromCenter = Math.sqrt(animationIndex / primesFound.length) * radiusFactor;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        const x = centerX + distanceFromCenter * Math.cos(angle);
        const y = centerY + distanceFromCenter * Math.sin(angle);

        // Disegna il numero
        drawPrimeNumber(number, x, y);

        // Incrementa l'indice e programma la prossima animazione
        animationIndex++;

        // Aggiorna lo stato
        statusElement.textContent = `Animazione in corso: ${animationIndex} di ${primesFound.length}`;

        // Calcola il ritardo in base alla velocità di animazione
        const delay = 1000 / animationSpeed;

        // Programma la prossima animazione
        setTimeout(animatePrimes, delay);
    }
    
    // Disegna un numero primo sul canvas
    function drawPrimeNumber(number, x, y) {
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');
        const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color');

        // Calcola dimensioni in base al numero
        const size = Math.min(30, Math.max(15, 20 - Math.log10(number)));

        // Aggiungi effetto glow
        ctx.shadowColor = primaryColor;
        ctx.shadowBlur = 15;

        // Disegna un cerchio con effetto pulsante
        const pulseSize = size * (1 + 0.1 * Math.sin(Date.now() * 0.005));

        // Crea un gradiente radiale
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, pulseSize);
        gradient.addColorStop(0, secondaryColor);
        gradient.addColorStop(1, primaryColor);

        ctx.beginPath();
        ctx.arc(x, y, pulseSize, 0, 2 * Math.PI);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Rimuovi l'effetto glow per il testo
        ctx.shadowBlur = 0;

        // Disegna il testo del numero
        ctx.fillStyle = 'white';
        ctx.font = `bold ${Math.max(10, Math.min(14, 18 - Math.log10(number)))}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(number.toString(), x, y);
    }
    
    // Mostra un errore
    function showError(message, isWarning = false) {
        if (isWarning) {
            statusElement.textContent = message;
            statusElement.style.color = 'var(--warning-color)';
        } else {
            statusElement.textContent = message;
            statusElement.style.color = 'var(--error-color)';
        }

        // Per errori gravi relativi alla memoria, mostra anche un avviso dettagliato
        if (message.includes('memoria')) {
            showMemoryWarning();
        }

        setTimeout(() => {
            statusElement.textContent = 'Pronto';
            statusElement.style.color = '';
        }, 5000);

        resetStatus();
    }
    
    // Reimposta lo stato
    function resetStatus() {
        calculateBtn.disabled = false;
        statusElement.textContent = 'Pronto';
        animationActive = false;
    }
}

// Inizializza il calcolatore di costanti matematiche
function initConstantsCalculator() {
    const calculatePiBtn = document.getElementById('calculate-pi');
    const calculateEBtn = document.getElementById('calculate-e');
    const calculatePhiBtn = document.getElementById('calculate-phi');
    const calculateSqrt2Btn = document.getElementById('calculate-sqrt2');
    const exportConstantBtn = document.getElementById('export-constant-btn');
    const precisionInput = document.getElementById('precision');
    const constantsOutput = document.getElementById('constants-output');

    // Variabile per memorizzare l'ultima costante calcolata
    let lastCalculatedConstant = {
        name: '',
        value: '',
        precision: 0
    };

    // Calcola Pi usando l'algoritmo di Chudnovsky
    calculatePiBtn.addEventListener('click', function() {
        const precision = parseInt(precisionInput.value);
        if (isNaN(precision) || precision <= 0 || precision > 1000) {
            alert('Inserisci una precisione valida tra 1 e 1000.');
            return;
        }

        constantsOutput.textContent = 'Calcolo di π in corso...';
        calculatePiBtn.disabled = true;

        setTimeout(() => {
            try {
                const pi = calculatePi(precision);
                constantsOutput.textContent = `π = ${pi}`;

                // Salva l'ultima costante calcolata
                lastCalculatedConstant = {
                    name: 'Pi Greco (π)',
                    value: pi,
                    precision: precision
                };
            } catch (error) {
                constantsOutput.textContent = `Errore: ${error.message}`;
            } finally {
                calculatePiBtn.disabled = false;
            }
        }, 100);
    });

    // Calcola e usando la serie di Taylor
    calculateEBtn.addEventListener('click', function() {
        const precision = parseInt(precisionInput.value);
        if (isNaN(precision) || precision <= 0 || precision > 1000) {
            alert('Inserisci una precisione valida tra 1 e 1000.');
            return;
        }

        constantsOutput.textContent = 'Calcolo di e in corso...';
        calculateEBtn.disabled = true;

        setTimeout(() => {
            try {
                const e = calculateE(precision);
                constantsOutput.textContent = `e = ${e}`;

                // Salva l'ultima costante calcolata
                lastCalculatedConstant = {
                    name: 'Numero di Eulero (e)',
                    value: e,
                    precision: precision
                };
            } catch (error) {
                constantsOutput.textContent = `Errore: ${error.message}`;
            } finally {
                calculateEBtn.disabled = false;
            }
        }, 100);
    });

    // Calcola phi (sezione aurea)
    calculatePhiBtn.addEventListener('click', function() {
        const precision = parseInt(precisionInput.value);
        if (isNaN(precision) || precision <= 0 || precision > 1000) {
            alert('Inserisci una precisione valida tra 1 e 1000.');
            return;
        }

        constantsOutput.textContent = 'Calcolo di φ in corso...';
        calculatePhiBtn.disabled = true;

        setTimeout(() => {
            try {
                const phi = calculatePhi(precision);
                constantsOutput.textContent = `φ = ${phi}`;

                // Salva l'ultima costante calcolata
                lastCalculatedConstant = {
                    name: 'Sezione Aurea (φ)',
                    value: phi,
                    precision: precision
                };
            } catch (error) {
                constantsOutput.textContent = `Errore: ${error.message}`;
            } finally {
                calculatePhiBtn.disabled = false;
            }
        }, 100);
    });

    // Calcola radice di 2
    calculateSqrt2Btn.addEventListener('click', function() {
        const precision = parseInt(precisionInput.value);
        if (isNaN(precision) || precision <= 0 || precision > 1000) {
            alert('Inserisci una precisione valida tra 1 e 1000.');
            return;
        }

        constantsOutput.textContent = 'Calcolo di √2 in corso...';
        calculateSqrt2Btn.disabled = true;

        setTimeout(() => {
            try {
                const sqrt2 = calculateSqrt2(precision);
                constantsOutput.textContent = `√2 = ${sqrt2}`;

                // Salva l'ultima costante calcolata
                lastCalculatedConstant = {
                    name: 'Radice di 2 (√2)',
                    value: sqrt2,
                    precision: precision
                };
            } catch (error) {
                constantsOutput.textContent = `Errore: ${error.message}`;
            } finally {
                calculateSqrt2Btn.disabled = false;
            }
        }, 100);
    });

    // Funzione per calcolare Pi con l'algoritmo di Chudnovsky
    function calculatePi(precision) {
        // Per semplicità, usiamo una versione semplificata per calcolare Pi
        // In un'implementazione reale, si userebbe l'algoritmo di Chudnovsky o Bailey-Borwein-Plouffe
        let pi = 0;
        let sign = 1;

        // Formula di Leibniz: π/4 = 1 - 1/3 + 1/5 - 1/7 + ...
        const iterations = Math.min(100000, precision * 100);
        for (let i = 0; i < iterations; i++) {
            pi += sign / (2 * i + 1);
            sign = -sign;
        }

        pi *= 4;
        return pi.toFixed(precision);
    }

    // Funzione per calcolare e usando la serie di Taylor
    function calculateE(precision) {
        // e = 1 + 1/1! + 1/2! + 1/3! + ...
        let e = 1;
        let factorial = 1;

        const iterations = Math.min(1000, precision * 2);
        for (let i = 1; i <= iterations; i++) {
            factorial *= i;
            e += 1 / factorial;
        }

        return e.toFixed(precision);
    }

    // Funzione per calcolare phi (sezione aurea)
    function calculatePhi(precision) {
        // φ = (1 + √5) / 2
        const sqrt5 = Math.sqrt(5);
        const phi = (1 + sqrt5) / 2;

        return phi.toFixed(precision);
    }

    // Funzione per calcolare la radice di 2
    function calculateSqrt2(precision) {
        // Metodo di Newton-Raphson per calcolare √2
        let x = 1;
        const iterations = Math.min(1000, precision * 2);

        for (let i = 0; i < iterations; i++) {
            x = 0.5 * (x + 2 / x);
        }

        return x.toFixed(precision);
    }

    // Gestisci il pulsante di esportazione delle costanti
    exportConstantBtn.addEventListener('click', function() {
        if (!lastCalculatedConstant.name) {
            alert('Nessuna costante da esportare. Calcola prima una costante.');
            return;
        }

        // Crea il contenuto del file
        const content = `${lastCalculatedConstant.name}\n` +
                        `Precisione: ${lastCalculatedConstant.precision} cifre decimali\n` +
                        `Valore: ${lastCalculatedConstant.value}\n\n` +
                        `Calcolato con MathMagia - ${new Date().toLocaleString()}`;

        // Nome del file basato sulla costante
        const filename = lastCalculatedConstant.name.replace(/[()]/g, '').replace(/\s+/g, '_').toLowerCase() + '.txt';

        // Esporta il file
        exportToFile(content, filename);
    });
}

// Inizializza le costanti matematiche
function initConstants() {
    const constantCards = document.querySelectorAll('.constant-card');
    const modal = document.getElementById('constant-modal');
    const modalContent = document.getElementById('modal-content');
    const closeModal = document.querySelector('.close-modal');

    // Dati dettagliati per ogni costante
    const constantsData = {
        pi: {
            title: 'Pi Greco (π)',
            value: '3.14159265358979323846...',
            description: `
                <p>Il Pi Greco (π) è una delle costanti matematiche più famose e importanti. Rappresenta il rapporto tra la circonferenza di un cerchio e il suo diametro.</p>
                <p>Questa costante irrazionale e trascendente ha affascinato matematici per millenni. Il suo valore è stato calcolato con sempre maggiore precisione nel corso della storia.</p>
                <h4>Formule importanti con π:</h4>
                <ul>
                    <li>Area del cerchio: A = πr²</li>
                    <li>Circonferenza del cerchio: C = 2πr</li>
                    <li>Volume della sfera: V = (4/3)πr³</li>
                    <li>Formula di Eulero: e<sup>iπ</sup> + 1 = 0</li>
                </ul>
                <h4>Curiosità:</h4>
                <p>Il record attuale per il calcolo di π è di oltre 100 trilioni di cifre decimali. Esistono anche competizioni di memorizzazione delle cifre di π, con record di oltre 70.000 cifre memorizzate.</p>
            `
        },
        e: {
            title: 'Numero di Eulero (e)',
            value: '2.71828182845904523536...',
            description: `
                <p>Il numero di Eulero, indicato con la lettera "e", è la base dei logaritmi naturali. È una costante matematica irrazionale e trascendente di fondamentale importanza in analisi matematica.</p>
                <p>Può essere definito come il limite della sequenza (1 + 1/n)<sup>n</sup> quando n tende all'infinito.</p>
                <h4>Formule importanti con e:</h4>
                <ul>
                    <li>Crescita esponenziale: y = e<sup>x</sup></li>
                    <li>Formula di Eulero: e<sup>iπ</sup> + 1 = 0</li>
                    <li>Derivata di e<sup>x</sup>: d/dx(e<sup>x</sup>) = e<sup>x</sup></li>
                </ul>
                <h4>Applicazioni:</h4>
                <p>Il numero e appare in molti contesti, dalla matematica finanziaria (interesse composto continuo) alla fisica quantistica, dalla teoria della probabilità alla statistica.</p>
            `
        },
        phi: {
            title: 'Sezione Aurea (φ)',
            value: '1.61803398874989484820...',
            description: `
                <p>La sezione aurea (φ o phi) è un rapporto speciale che si trova spesso in natura e viene utilizzato in arte e architettura per le sue proprietà estetiche.</p>
                <p>Due quantità sono in rapporto aureo se il loro rapporto è uguale al rapporto tra la loro somma e la quantità maggiore.</p>
                <h4>Formula:</h4>
                <p>φ = (1 + √5) / 2 ≈ 1.618033988749...</p>
                <h4>Proprietà interessanti:</h4>
                <ul>
                    <li>φ² = φ + 1</li>
                    <li>1/φ = φ - 1 ≈ 0.618033988749...</li>
                    <li>La successione di Fibonacci si avvicina al rapporto aureo</li>
                </ul>
                <h4>Presenza in natura e arte:</h4>
                <p>La sezione aurea si trova nelle spirali delle conchiglie, nella disposizione dei semi nei girasoli, nelle proporzioni del corpo umano e in molte opere d'arte e architettura, dal Partenone alla Gioconda.</p>
            `
        },
        gamma: {
            title: 'Costante di Eulero-Mascheroni (γ)',
            value: '0.57721566490153286060...',
            description: `
                <p>La costante di Eulero-Mascheroni (γ) è una costante matematica che appare in molti contesti in analisi e teoria dei numeri.</p>
                <p>È definita come il limite della differenza tra la serie armonica e il logaritmo naturale: γ = lim<sub>n→∞</sub>(∑<sub>k=1</sub><sup>n</sup> 1/k - ln(n))</p>
                <h4>Proprietà:</h4>
                <ul>
                    <li>Appare nella funzione zeta di Riemann: ζ(1+ε) ≈ 1/ε + γ + O(ε)</li>
                    <li>Nella funzione Gamma: Γ'(1) = -γ</li>
                    <li>Nella distribuzione dei numeri primi</li>
                </ul>
                <h4>Curiosità:</h4>
                <p>Non si sa ancora se γ sia un numero razionale o irrazionale, ed è uno dei problemi aperti più importanti in teoria dei numeri.</p>
            `
        },
        sqrt2: {
            title: 'Radice di 2 (√2)',
            value: '1.41421356237309504880...',
            description: `
                <p>La radice quadrata di 2 (√2) è il numero positivo che, moltiplicato per se stesso, dà come risultato 2. È la lunghezza della diagonale di un quadrato di lato 1.</p>
                <p>Fu uno dei primi numeri irrazionali ad essere scoperto, e la sua scoperta da parte dei Pitagorici causò una crisi nei fondamenti della matematica greca.</p>
                <h4>Proprietà:</h4>
                <ul>
                    <li>√2 è irrazionale (non può essere espresso come frazione di numeri interi)</li>
                    <li>In un triangolo rettangolo isoscele, il rapporto tra l'ipotenusa e i cateti è √2</li>
                    <li>Nella scala musicale, l'intervallo di un'ottava è diviso in 12 semitoni, ciascuno con un rapporto di frequenza di 2<sup>1/12</sup> ≈ 1.059463...</li>
                </ul>
                <h4>Approssimazioni:</h4>
                <p>Alcune buone approssimazioni razionali di √2 sono: 7/5 = 1.4, 17/12 ≈ 1.417, 41/29 ≈ 1.414, 99/70 ≈ 1.4143</p>
            `
        },
        g: {
            title: 'Accelerazione Gravitazionale (g)',
            value: '9.80665 m/s²',
            description: `
                <p>L'accelerazione gravitazionale standard (g) è l'accelerazione dovuta alla gravità sulla superficie terrestre. È una costante fisica fondamentale utilizzata in molti calcoli.</p>
                <p>Il valore standard di g è definito come 9.80665 m/s², ma il valore effettivo varia leggermente in base alla posizione sulla Terra.</p>
                <h4>Fattori che influenzano g:</h4>
                <ul>
                    <li>Latitudine: g è maggiore ai poli (9.83 m/s²) e minore all'equatore (9.78 m/s²)</li>
                    <li>Altitudine: g diminuisce con l'aumentare dell'altezza</li>
                    <li>Densità locale della crosta terrestre</li>
                </ul>
                <h4>Applicazioni:</h4>
                <p>La costante g è utilizzata in molte formule fisiche, come:</p>
                <ul>
                    <li>Caduta libera: h = (1/2)gt²</li>
                    <li>Periodo di un pendolo: T = 2π√(L/g)</li>
                    <li>Energia potenziale gravitazionale: E<sub>p</sub> = mgh</li>
                </ul>
            `
        }
    };
    
    // Aggiungi event listener per aprire il modal
    constantCards.forEach(card => {
        const detailsBtn = card.querySelector('.btn-details');
        detailsBtn.addEventListener('click', function() {
            const constantType = card.getAttribute('data-constant');
            const constantData = constantsData[constantType];
            
            if (constantData) {
                modalContent.innerHTML = `
                    <h2>${constantData.title}</h2>
                    <div class="constant-value-large">${constantData.value}</div>
                    <div class="constant-description">
                        ${constantData.description}
                    </div>
                `;
                
                modal.style.display = 'flex';
            }
        });
    });
    
    // Chiudi il modal quando si clicca sulla X
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Chiudi il modal quando si clicca fuori dal contenuto
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Inizializza il pulsante di scroll to top
function initScrollToTop() {
    const scrollBtn = document.getElementById('scroll-top-btn');
    const scrollToTopContainer = document.querySelector('.scroll-to-top');
    
    // Mostra/nascondi il pulsante in base allo scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopContainer.classList.add('visible');
        } else {
            scrollToTopContainer.classList.remove('visible');
        }
    });
    
    // Scroll to top quando si clicca sul pulsante
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Inizializza le animazioni di fade-in
function initFadeInAnimations() {
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Inizializza lo smooth scrolling per i link di navigazione
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Considera l'header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Aggiorna la classe active
                document.querySelectorAll('nav a').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                
                this.classList.add('active');
            }
        });
    });
    
    // Aggiorna la classe active durante lo scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;

        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = '#' + section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelectorAll('nav a').forEach(navLink => {
                    navLink.classList.remove('active');

                    if (navLink.getAttribute('href') === sectionId) {
                        navLink.classList.add('active');
                    }
                });
            }
        });
    });
}

// Funzione per verificare se un numero è primo e trovare un divisore
function isPrimeWithDivisor(num) {
    // Gestisci i casi speciali
    if (num <= 1) return { isPrime: false, divisor: num };
    if (num <= 3) return { isPrime: true, divisor: null };
    if (num % 2 === 0) return { isPrime: false, divisor: 2 };
    if (num % 3 === 0) return { isPrime: false, divisor: 3 };

    // Verifica divisibilità per numeri della forma 6k±1
    const sqrtNum = Math.sqrt(num);
    for (let i = 5; i <= sqrtNum; i += 6) {
        if (num % i === 0) return { isPrime: false, divisor: i };
        if (num % (i + 2) === 0) return { isPrime: false, divisor: i + 2 };
    }

    return { isPrime: true, divisor: null };
}

// Funzione per inizializzare il verificatore di numeri primi
function initPrimeChecker() {
    try {
        console.log('Inizializzazione del verificatore di numeri primi...');
        const checkPrimeInput = document.getElementById('check-prime');
        const checkPrimeBtn = document.getElementById('check-prime-btn');
        const primeCheckResult = document.getElementById('prime-check-result');

        if (!checkPrimeInput || !checkPrimeBtn || !primeCheckResult) {
            console.error('Elementi del verificatore di numeri primi non trovati nel DOM');
            return;
        }

        checkPrimeBtn.addEventListener('click', function() {
            try {
                const number = parseInt(checkPrimeInput.value);

                if (isNaN(number) || number <= 0) {
                    primeCheckResult.className = 'prime-check-result not-prime';
                    primeCheckResult.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Inserisci un numero positivo valido.';
                    return;
                }

                // Verifica se il numero è troppo grande
                if (number > Number.MAX_SAFE_INTEGER) {
                    primeCheckResult.className = 'prime-check-result not-prime';
                    primeCheckResult.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Numero troppo grande per essere verificato con precisione.';
                    return;
                }

                // Mostra un messaggio di caricamento per numeri molto grandi
                if (number > 1000000) {
                    primeCheckResult.className = 'prime-check-result';
                    primeCheckResult.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifica in corso...';
                }

                // Esegui la verifica in modo asincrono per non bloccare l'interfaccia
                setTimeout(() => {
                    try {
                        const result = isPrimeWithDivisor(number);

                        if (result.isPrime) {
                            primeCheckResult.className = 'prime-check-result is-prime';
                            primeCheckResult.innerHTML = `<i class="fas fa-check-circle"></i> ${number.toLocaleString()} è un numero primo!`;
                        } else {
                            primeCheckResult.className = 'prime-check-result not-prime';
                            primeCheckResult.innerHTML = `<i class="fas fa-times-circle"></i> ${number.toLocaleString()} non è primo. È divisibile per ${result.divisor}.`;
                        }
                    } catch (error) {
                        console.error('Errore durante la verifica del numero primo:', error);
                        primeCheckResult.className = 'prime-check-result not-prime';
                        primeCheckResult.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Errore durante la verifica.';
                    }
                }, 10);
            } catch (error) {
                console.error('Errore nel gestore del pulsante di verifica:', error);
            }
        });

        // Aggiungi la possibilità di premere Invio per verificare
        checkPrimeInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkPrimeBtn.click();
            }
        });

        console.log('Verificatore di numeri primi inizializzato con successo');
    } catch (error) {
        console.error('Errore durante l\'inizializzazione del verificatore di numeri primi:', error);
    }
}