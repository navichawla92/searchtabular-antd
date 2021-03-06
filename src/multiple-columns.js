import singleColumn from './single-column';
import strategies from './strategies';

const multipleColumns = ({
  castingStrategy, columns, query, strategy, transform
}) => data => (
    query ?
      Object.keys(query).reduce(
        (filteredData, searchColumn) => {
          const column = columns.find(c => c.property === searchColumn);
          let result;
          if (column.type === 'date') {
            result = singleColumn({
              castingStrategy,
              columns,
              searchColumn,
              query: query[searchColumn],
              strategy: strategies.date,
              transform: t => t
            })(filteredData);
          } else if (column.type === 'number') {
            result = singleColumn({
              castingStrategy: t => t,
              columns,
              searchColumn,
              query: query[searchColumn],
              strategy: strategies.number,
              transform: t => t
            })(filteredData);
          } else if (column.checkbox) {
            result = singleColumn({
              castingStrategy: t => t,
              columns,
              searchColumn,
              query: query[searchColumn],
              strategy: strategies.boolean,
              transform: t => t
            })(filteredData);
          } else {
            result = singleColumn({
              castingStrategy,
              columns,
              searchColumn,
              query: query[searchColumn],
              strategy,
              transform
            })(filteredData);
          }
          return result;
        },
        data
      )
      : data
  );

export default multipleColumns;
