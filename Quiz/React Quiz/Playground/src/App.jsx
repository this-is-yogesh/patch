import React, { useState, useEffect, useCallback, useMemo } from "react";

// Configuration
const STORAGE_KEY = "highlightSaver_react_highlights";

// Utility function to get highlights from localStorage
const getHighlights = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error reading from localStorage:", e);
    return [];
  }
};

// Utility function to save highlights to localStorage
const saveHighlights = highlights => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(highlights));
  } catch (e) {
    console.error("Error writing to localStorage:", e);
  }
};

// Helper component for individual highlight item in the popup
const HighlightItem = ({ highlight, onDelete, onSummarize }) => (
  <div className="highlight-card">
    <p className="highlight-text">{highlight.text}</p>
    <div className="highlight-footer">
      <span className="highlight-timestamp">{highlight.timestamp}</span>
      <div className="action-buttons">
        <button
          onClick={() => onSummarize(highlight.id)}
          className="action-button summarize-btn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="action-icon"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.467 9.5 3.5 7.5 3.5 5.5 3.5 4.5 5.467 4.5 7.253v13m7.5-13C13.168 5.467 14.5 3.5 16.5 3.5 18.5 3.5 19.5 5.467 19.5 7.253v13"
            />
          </svg>
          Summarize
        </button>
        <button
          onClick={() => onDelete(highlight.id)}
          className="action-button delete-btn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="action-icon"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete
        </button>
      </div>
    </div>
  </div>
);

// Main Application Component
const App = () => {
  const [highlights, setHighlights] = useState([]);
  const [selection, setSelection] = useState(null); // { text, rect }
  const [summary, setSummary] = useState({
    id: null,
    text: "",
    loading: false,
  });

  // ---------------------------------------------------
  // --- CSS Styles replacing Tailwind ---
  // ---------------------------------------------------
  const customStyles = `
    /* Global Styles */
    * { box-sizing: border-box; }
    body {
        font-family: 'Inter', Arial, sans-serif;
        margin: 0;
        background-color: #f7f7f7;
    }
    .app-container {
        display: flex;
        min-height: 100vh;
        color: #333;
    }

    /* Webpage Content Area */
    .content-area {
        flex-grow: 1;
        padding: 2rem;
    }
    .header {
        font-size: 2.25rem;
        font-weight: 800;
        color: #1a1a1a;
        margin-bottom: 1.5rem;
    }
    .subtitle {
        color: #6b7280;
        margin-bottom: 2.5rem;
    }
    .article-content {
        font-size: 1.125rem;
        line-height: 1.6;
        font-family: Georgia, serif;
        background-color: #fff;
        padding: 2rem;
        border-radius: 0.75rem;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    .article-content p {
        margin-bottom: 1.5rem;
    }

    /* Highlight Span */
    .highlighted-text {
        background-color: #ffc34d; /* Yellow/Amber */
        padding: 1px 2px;
        border-radius: 3px;
    }

    /* Floating Save Button */
    .save-button {
        position: fixed;
        z-index: 50;
        padding: 0.5rem 1rem;
        background-color: #4f46e5; /* Indigo */
        color: white;
        border: none;
        border-radius: 0.5rem;
        box-shadow: 0 5px 15px rgba(79, 70, 229, 0.5);
        font-weight: 600;
        transform: translateX(-50%);
        cursor: pointer;
        transition: background-color 0.15s, transform 0.15s;
    }
    .save-button:hover {
        background-color: #4338ca;
    }
    .save-button:active {
        transform: translateX(-50%) scale(0.95);
    }

    /* Extension Popup Sidebar */
    .popup-sidebar {
        width: 100%; /* Default mobile width */
        background-color: #fff;
        border-left: 1px solid #e5e7eb;
        box-shadow: -10px 0 20px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        padding: 1.5rem;
        gap: 1.5rem;
        flex-shrink: 0;
    }
    .popup-header {
        font-size: 1.5rem;
        font-weight: bold;
        color: #4338ca;
        border-bottom: 1px solid #e5e7eb;
        padding-bottom: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .highlight-count {
        font-size: 0.875rem;
        font-weight: normal;
        color: #6366f1;
        background-color: #eef2ff;
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
    }

    /* Summary Output */
    .summary-box {
        padding: 1rem;
        border-radius: 0.75rem;
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    .summary-loading {
        background-color: #e0f7fa; /* Light Cyan */
        border: 1px solid #b2ebf2; 
    }
    .summary-success {
        background-color: #e8f5e9; /* Light Green */
        border: 1px solid #c8e6c9;
    }
    .summary-header {
        font-weight: bold;
        font-size: 1.125rem;
        margin-bottom: 0.25rem;
        color: #00796b; /* Teal */
    }
    .summary-text {
        font-size: 0.875rem;
        font-style: italic;
        color: #4b5563;
    }

    /* Highlights List */
    .highlights-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow-y: auto;
        flex-grow: 1;
        max-height: 80vh;
    }
    .empty-message {
        color: #9ca3af;
        text-align: center;
        padding: 2.5rem 0;
    }
    
    /* Highlight Item */
    .highlight-card {
        padding: 1rem;
        background-color: #fff;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.2s;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    .highlight-card:hover {
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .highlight-text {
        font-size: 0.875rem;
        color: #1f2937;
        font-style: italic;
        line-height: 1.4;
        word-break: break-word;
    }
    .highlight-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 0.5rem;
        border-top: 1px solid #f3f4f6;
    }
    .highlight-timestamp {
        font-size: 0.75rem;
        color: #6366f1;
    }
    .action-buttons {
        display: flex;
        gap: 0.5rem;
    }
    .action-button {
        font-size: 0.75rem;
        font-weight: 500;
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        cursor: pointer;
        border: none;
        background: none;
        transition: background-color 0.15s, color 0.15s;
        display: flex;
        align-items: center;
    }
    .action-icon {
        height: 16px;
        width: 16px;
        display: inline-block;
        margin-right: 0.25rem;
    }
    .summarize-btn {
        color: #2563eb;
    }
    .summarize-btn:hover {
        background-color: #eff6ff;
        color: #1e40af;
    }
    .delete-btn {
        color: #dc2626;
    }
    .delete-btn:hover {
        background-color: #fee2e2;
        color: #991b1b;
    }

    /* Media Queries for Desktop Layout */
    @media (min-width: 768px) {
        .content-area {
            padding: 3rem 4rem;
        }
        .popup-sidebar {
            width: 24rem;
        }
    }
  `;
  // ---------------------------------------------------
  // --- End CSS Styles ---
  // ---------------------------------------------------

  // 1. Load highlights on component mount
  useEffect(() => {
    setHighlights(getHighlights());
  }, []);

  // 2. Setup selection listener on the document body
  useEffect(() => {
    const handleSelection = () => {
      const currentSelection = window.getSelection();
      const text = currentSelection.toString().trim();
      const article = document.getElementById("article-text");

      // Check if text is selected and the selection is within the article area
      if (
        text.length > 0 &&
        article &&
        article.contains(currentSelection.anchorNode) &&
        article.contains(currentSelection.focusNode)
      ) {
        const range = currentSelection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        setSelection({
          text,
          range,
          rect: {
            left: rect.left + rect.width / 2,
            top: window.scrollY + rect.top - 40,
          },
        });
      } else {
        setSelection(null);
      }
      setSummary({ id: null, text: "", loading: false }); // Clear summary on new selection
    };

    document.addEventListener("mouseup", handleSelection);

    // Cleanup listener
    return () => {
      document.removeEventListener("mouseup", handleSelection);
    };
  }, []);

  // 3. Highlight Saving Logic
  const saveHighlight = useCallback(() => {
    if (!selection) return;

    // Save to State/Storage
    const newHighlight = {
      id: Date.now().toString(),
      text: selection.text,
      timestamp: new Date().toLocaleTimeString(),
      url: window.location.href,
    };

    const newHighlights = [newHighlight, ...highlights];
    setHighlights(newHighlights);
    saveHighlights(newHighlights);

    // Visually highlight the text on the page (Direct DOM manipulation necessary for selection logic)
    const span = document.createElement("span");
    span.classList.add("highlighted-text"); // Use custom CSS class
    try {
      selection.range.surroundContents(span);
    } catch (error) {
      console.warn("Could not wrap selection across boundaries.", error);
    }

    // Clear the floating popup
    window.getSelection().removeAllRanges();
    setSelection(null);
  }, [selection, highlights]);

  // 4. Deletion Logic
  const deleteHighlight = useCallback(
    id => {
      const updatedHighlights = highlights.filter(h => h.id !== id);
      setHighlights(updatedHighlights);
      saveHighlights(updatedHighlights);

      // Clear summary if it was for the deleted item
      if (summary.id === id) {
        setSummary({ id: null, text: "", loading: false });
      }

      // In a real extension, we would also remove the highlight span from the DOM
    },
    [highlights, summary]
  );

  // 5. Summarization (Mocked API Call)
  const triggerSummary = useCallback(
    async id => {
      const highlight = highlights.find(h => h.id === id);
      if (!highlight) return;

      setSummary({ id, text: "Generating summary...", loading: true });

      // --- MOCK API CALL SIMULATION ---
      await new Promise(resolve => setTimeout(resolve, 1500));

      let mockSummary = "";
      if (highlight.text.length > 100) {
        mockSummary =
          "The selected excerpt covers the structural difficulties and investment required to scale current quantum devices.";
      } else if (highlight.text.includes("superposition")) {
        mockSummary =
          "This is the core principle of quantum mechanics used to create qubits.";
      } else {
        mockSummary =
          "A concise, one-sentence analysis of the highlighted content.";
      }

      setSummary({ id, text: mockSummary, loading: false });
      // --- END MOCK API CALL SIMULATION ---
    },
    [highlights]
  );

  // Memoize the rendered list for performance
  const sortedHighlights = useMemo(
    () => [...highlights].sort((a, b) => new Date(b.id) - new Date(a.id)),
    [highlights]
  );

  // Render the entire application structure
  return (
    <div className="app-container">
      {/* Inject custom CSS styles */}
      <style>{customStyles}</style>

      {/* Simulated Webpage Content Area (Left) */}
      <div className="content-area">
        <h1 className="header">
          Article: The Future of Quantum Computing (React Demo)
        </h1>
        <p className="subtitle">
          Select any text below to save a highlight using React state
          management.
        </p>

        <div id="article-text" className="article-content">
          <p>
            Quantum computing, once a theoretical concept, is rapidly
            transitioning into a tangible technological domain. At its core,
            quantum mechanics allows bits (qubits) to exist in superposition,
            simultaneously representing 0 and 1. This fundamental difference
            from classical binary computing offers the potential for solving
            complex problems currently intractable even for the most powerful
            supercomputers. This includes optimization problems, drug discovery,
            and materials science simulations. The promise is transformative,
            but the engineering challenges remain immense, primarily around
            decoherence and error correction.
          </p>
          <p>
            Major technology players are heavily investing in this space.
            Companies like Google, IBM, and various startups are competing to
            achieve 'quantum supremacy'—the point at which a quantum computer
            can perform a calculation that a classical computer cannot complete
            in a reasonable amount of time. While initial demonstrations of
            supremacy have been made, practical, fault-tolerant quantum
            computers are still years away. The current generation of devices
            are noisy and limited in the number of qubits, making them primarily
            useful for research and specialized near-term algorithms.
          </p>
          <p>
            The transition from current NISQ (Noisy Intermediate-Scale Quantum)
            devices to truly scalable quantum computers requires breakthroughs
            in hardware and error correction techniques. New materials,
            cryogenic cooling systems, and sophisticated control electronics are
            all part of the complex puzzle. Furthermore, developing quantum
            algorithms and the quantum programming ecosystem is crucial for
            making the technology accessible to software developers and industry
            experts. The societal and economic impact of this field is projected
            to be profound, restructuring sectors from finance to logistics.
          </p>
          <p>
            For end-users, the interaction with quantum systems will primarily
            occur through cloud services. Users will submit classical programs
            that are translated and run on remote quantum processors. This
            abstraction layer will be key to adoption, insulating developers
            from the underlying physical complexities. Security is another
            critical consideration, as quantum computers pose a threat to
            current public-key cryptography (e.g., RSA). Research in
            post-quantum cryptography is therefore a parallel necessity to
            safeguard future communications.
          </p>
        </div>

        {/* The floating "Save Highlight?" button (the extension's content script UI) */}
        {selection && (
          <button
            onClick={saveHighlight}
            className="save-button"
            style={{
              left: `${selection.rect.left}px`,
              top: `${selection.rect.top}px`,
            }}
          >
            Save Highlight?
          </button>
        )}
      </div>

      {/* Simulated Chrome Extension Popup/Sidebar (Right) */}
      <div className="popup-sidebar">
        <h2 className="popup-header">
          Saved Highlights
          <span className="highlight-count">{highlights.length}</span>
        </h2>

        {/* Summary Output */}
        {(summary.id || summary.loading) && (
          <div
            className={`summary-box ${
              summary.loading ? "summary-loading" : "summary-success"
            }`}
          >
            <h3 className="summary-header">
              AI Summary {summary.loading && "..."}
            </h3>
            <p className="summary-text">{summary.text}</p>
          </div>
        )}

        {/* Highlights List */}
        <div className="highlights-list">
          {sortedHighlights.length === 0 ? (
            <p className="empty-message">
              No highlights saved yet. Select text on the left to begin!
            </p>
          ) : (
            sortedHighlights.map(h => (
              <HighlightItem
                key={h.id}
                highlight={h}
                onDelete={deleteHighlight}
                onSummarize={triggerSummary}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
