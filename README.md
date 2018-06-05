
# Health of a Nation

## Summary
This application compares two attributes against the percentage of poverty.  The first is the percentage of the population
lacking healthcare.  Second, the percentage of the population against the percentage of poverty.  Both comparisons are done
by state, District of Columbia, and Puerto Rico.

## Data Acquisition
### United States Census Bureau
Healthcare information was downloaded for the following paramenters:
* Dataset:  2014 ACS 1-year estimates
* Filter:  Health Insurance
* Filter:  Poverty
* Filter:  All States within United States and Puerto Rico
### Behavioral Risk Factor Suyrveilance System
Binge drinking was downloaded for the same dimensions as from the Census Bureau.
### Consolidation
Both downloads were manually merged into a single csv file.

## Data Visualization
Scatter plots are used for data visualization.  Actual, a single, parameterized javascript application dynamically 
creates a scatter.  Depending on the parameter, which is a column name of a csv file, the plot is rendered.  This allows for 
easy extention of the application.

## Execution
* Initialize a directory for github processing.
* Pull the repository.
* Run python -m http.server from the directory.
* Select index.html.
* When index.html is displayed, a sub-display of "Lacking Healthcare" or "Binge Drinking" can be selected from a menu.
The application is designed to be extended.  Additional topics can be displayed by adding columns to the data.csv source file
and, adding corresponding html pages, and adding the link to the toc.html file (table of contents).
