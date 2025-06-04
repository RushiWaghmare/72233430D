import react from 'react';
import useState from 'react';

function App() {
  const [numbers, setNumbers] = useState([]);
  const [isLoading, loadingSet] = useState(false);
  const [lastResult, RecentResult] = useState(null);

  const size = 10;

  const typeOfNumber = {
    'p': 'Primes',
    'f': 'Fibonacci',
    'e': 'Even',
    'r': 'Random'
  };

  const generateNumber = (type) => {

    const numberGenerator = {

      'p': () => [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
      [Math.floor(Math.random() * 15)],

      'f': () => [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233]
      [Math.floor(Math.random() * 12)],

      'e': () => (Math.floor(Math.random() * 25) + 1) * 2,

      'r': () => Math.floor(Math.random() * 100) + 1
    };

    return numberGenerator[type]();
  };

  const avgFunc = (nums) => {
    if (nums.length === 0) return 0;
    return parseFloat((nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(2));
  };

  const handleRequest = async (type) => {
    loadingSet(true);
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newNumber = generateNumber(type);
    const prevState = [...numbers];
    
    let changeNumbers = [...numbers];
    if (!changeNumbers.includes(newNumber)) {
      changeNumbers.push(newNumber);
    }
    
    while (changeNumbers.length > size) {
      changeNumbers.shift();
    }
    
    const avg = avgFunc(changeNumbers);
    
    setNumbers(changeNumbers);
    RecentResult({
      windowPrevState: prevState,
      windowCurrState: changeNumbers,
      numbers: [newNumber],
      avg: avg
    });
    
    loadingSet(false);
  };

  const reset = () => {
    setNumbers([]);
    RecentResult(null);
  };

  return (
    <div style={styles.container}>

      <div style={styles.content}>

        <div style={styles.header}>

          <h1 style={styles.title}>Number avg Calculator</h1>

          <div style={styles.config}>

            Window Size: {size} | Current Count: {numbers.length}

          </div>
        </div>

      
        <div style={styles.buttonRow}>

          {Object.entries(typeOfNumber).map(([key, name]) => (

            <button
              key={key}
              onClick={() => handleRequest(key)}
              disabled={isLoading}
              style={{
                ...styles.button,
                backgroundColor: isLoading ? '#ccc' : '#4a90e2'
              }}
            >

              {name}
              <div style={styles.endpoint}>/numbers/{key}</div>
            </button>
          ))}
        </div>

        <div style={styles.actionRow}>
          <button onClick={reset} style={styles.resetBtn}>
            Reset
          </button>
          {isLoading && (
            <span style={styles.loading}>Processing...</span>
          )}
        </div>

        
        <div style={styles.section}>

          <h3 style={styles.sectionTitle}>Current Window</h3>

          <div style={styles.numbersBox}>
            {numbers.length > 0 ? (
              <>
                {numbers.map((num, i) => (
                  <span key={i} style={styles.numberTag}>{num}</span>
                ))}

                <div style={styles.avg}>
                  avg: {avgFunc(numbers)}
                </div>
              </>
            ) : (
              <div style={styles.empty}>No numbers yet</div>
            )}
          </div>
        </div>

       
        {lastResult && (

          <div style={styles.section}>

            <h3 style={styles.sectionTitle}>Last Response</h3>

            <div style={styles.jsonBox}>

              <pre style={styles.json}>
                {JSON.stringify(lastResult, null, 2)}
              </pre>

            </div>
            
          </div>
        )}

      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Arial, sans-serif',
    padding: '20px'
  },
  content: {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  title: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '10px'
  },
  config: {
    color: '#666',
    fontSize: '14px'
  },
  buttonRow: {
    display: 'flex',
    gap: '15px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },
  button: {
    flex: 1,
    padding: '15px',
    backgroundColor: '#4a90e2',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    textAlign: 'center',
    minWidth: '120px'
  },
  endpoint: {
    fontSize: '12px',
    marginTop: '5px',
    opacity: 0.8
  },
  actionRow: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    marginBottom: '30px'
  },
  resetBtn: {
    padding: '10px 20px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  loading: {
    color: '#666',
    fontSize: '14px'
  },
  section: {
    marginBottom: '25px'
  },
  sectionTitle: {
    fontSize: '18px',
    color: '#333',
    marginBottom: '10px',
    borderBottom: '2px solid #eee',
    paddingBottom: '5px'
  },
  numbersBox: {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '5px',
    border: '1px solid #ddd'
  },
  numberTag: {
    display: 'inline-block',
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    padding: '5px 10px',
    margin: '3px',
    borderRadius: '15px',
    fontSize: '14px'
  },
  avg: {
    marginTop: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#2e7d32'
  },
  empty: {
    color: '#999',
    fontStyle: 'italic'
  },
  jsonBox: {
    backgroundColor: '#2d3748',
    borderRadius: '5px',
    overflow: 'hidden'
  },
  json: {
    color: '#a0aec0',
    padding: '15px',
    fontSize: '13px',
    margin: 0,
    fontFamily: 'arial',
    overflow: 'auto'
  }
};

export default App;