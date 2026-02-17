function ActionBar({
    todos = [],
    selectedTodos = [],
    handleSelectAll,
    handleBulkStatusChange,
    filterStatus,
    setFilterStatus
}) {
    return (
        <div className="action-bar">
            <div className="action-top">
                <label>
                    <input
                        type="checkbox"
                        checked={todos.length > 0 && selectedTodos.length === todos.length}
                        onChange={handleSelectAll}
                    />
                    Select All
                </label>

                <select
                    onChange={(e) => {
                        handleBulkStatusChange(e.target.value);
                        e.target.value = "";
                    }}
                    disabled={selectedTodos.length === 0}
                    className="bulk-action-select"
                    value=""
                >
                    <option value="">completed</option>
                    <option value="completed">Mark as Completed</option>
                    <option value="in-progress">Mark as In Progress</option>
                    <option value="on-hold">Mark as On Hold</option>
                </select>

                <div className="filters">
                    <label>
                        <input
                            type="radio"
                            name="filter"
                            checked={filterStatus === 'all'}
                            onChange={() => setFilterStatus('all')}
                        />
                        ALL
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="filter"
                            checked={filterStatus === 'completed'}
                            onChange={() => setFilterStatus('completed')}
                        />
                        COMPLETED
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="filter"
                            checked={filterStatus === 'in-progress'}
                            onChange={() => setFilterStatus('in-progress')}
                        />
                        IN PROGRESS
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="filter"
                            checked={filterStatus === 'on-hold'}
                            onChange={() => setFilterStatus('on-hold')}
                        />
                        ON HOLD
                    </label>
                </div>
            </div>
        </div>
    )
}

export default ActionBar

