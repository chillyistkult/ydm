angular.module('ngTableTemplates', ['ngTable']).run(['$templateCache', function ($templateCache) {
    $templateCache.put('ng-table/filterRow.html', '<tr ng-show="show_filter" class="ng-table-filters"> <th data-title-text="{{$column.titleAlt(this) || $column.title(this)}}" ng-repeat="$column in $columns" ng-if="$column.show(this)" class="filter {{$column.class(this)}}" ng-class="params.settings().filterOptions.filterLayout===\'horizontal\' ? \'filter-horizontal\' : \'\'"> <div ng-repeat="(name, filter) in $column.filter(this)" ng-include="config.getTemplateUrl(filter)" class="filter-cell" ng-class="[getFilterCellCss($column.filter(this), params.settings().filterOptions.filterLayout), $last ? \'last\' : \'\']"> </div> </th> </tr> ');
    $templateCache.put('ng-table/filters/number.html', '<input type="number" name="{{name}}" ng-disabled="$filterRow.disabled" ng-model="params.filter()[name]" class="input-filter form-control" placeholder="{{getFilterPlaceholderValue(filter, name)}}"/> ');
    $templateCache.put('ng-table/filters/select-multiple.html', '<select ng-options="data.id as data.title for data in $column.data" ng-disabled="$filterRow.disabled" multiple ng-multiple="true" ng-model="params.filter()[name]" class="filter filter-select-multiple form-control" name="{{name}}"> </select> ');
    $templateCache.put('ng-table/filters/select.html', '<select ng-options="data.id as data.title for data in $selectData" ng-table-select-filter-ds="$column" ng-disabled="$filterRow.disabled" ng-model="params.filter()[name]" class="filter filter-select form-control" name="{{name}}"> <option style="display:none" value=""></option> </select> ');
    $templateCache.put('ng-table/filters/text.html', '<div class="input-group"><input type="search" name="{{name}}" ng-disabled="$filterRow.disabled" ng-model="params.filter()[name]" class="input-filter form-control" placeholder="{{getFilterPlaceholderValue(filter, name)}}"/><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div> ');
    $templateCache.put('ng-table/groupRow.html', '<tr ng-if="params.hasGroup()" ng-show="$groupRow.show" class="ng-table-group-header"> <th colspan="{{getVisibleColumns().length}}" class="sortable" ng-class="{ \'sort-asc\': params.hasGroup($selGroup, \'asc\'), \'sort-desc\':params.hasGroup($selGroup, \'desc\') }"> <a href="" ng-click="isSelectorOpen=!isSelectorOpen" class="ng-table-group-selector"> <strong class="sort-indicator">{{$selGroupTitle}}</strong> <button class="btn btn-default btn-xs ng-table-group-close" ng-click="$groupRow.show=false; $event.preventDefault(); $event.stopPropagation();"> <span class="glyphicon glyphicon-remove"></span> </button> <button class="btn btn-default btn-xs ng-table-group-toggle" ng-click="toggleDetail(); $event.preventDefault(); $event.stopPropagation();"> <span class="glyphicon" ng-class="{ \'glyphicon-resize-small\': params.settings().groupOptions.isExpanded, \'glyphicon-resize-full\': !params.settings().groupOptions.isExpanded }"></span> </button> </a> <div class="list-group" ng-if="isSelectorOpen"> <a href="" class="list-group-item" ng-repeat="group in getGroupables()" ng-click="groupBy(group)"> <strong>{{ getGroupTitle(group)}}</strong> <strong ng-class="isSelectedGroup(group) && \'sort-indicator\'"></strong> </a> </div> </th> </tr> ');
    $templateCache.put('ng-table/header.html', '<ng-table-group-row></ng-table-group-row> <ng-table-sorter-row></ng-table-sorter-row> <ng-table-filter-row></ng-table-filter-row> ');
    $templateCache.put('ng-table/pager.html', '<div class="ng-cloak ng-table-pager" ng-if="params.data.length"> <div ng-if="params.settings().counts.length" class="ng-table-counts btn-group pull-right"> <button ng-repeat="count in params.settings().counts" type="button" ng-class="{\'active\':params.count()==count}" ng-click="params.count(count)" class="btn btn-default"> <span ng-bind="count"></span> </button> </div> <ul ng-if="pages.length" class="pagination ng-table-pagination"> <li ng-class="{\'disabled\': !page.active && !page.current, \'active\': page.current}" ng-repeat="page in pages" ng-switch="page.type"> <a ng-switch-when="prev" ng-click="params.page(page.number)" href="">&laquo;</a> <a ng-switch-when="first" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="page" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="more" ng-click="params.page(page.number)" href="">&#8230;</a> <a ng-switch-when="last" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="next" ng-click="params.page(page.number)" href="">&raquo;</a> </li> </ul> </div> ');
    $templateCache.put('ng-table/sorterRow.html', '<tr> <th ng-repeat="$column in $columns" ng-class="{ \'sortable\': $column.sortable(this), \'sort-asc\': params.sorting()[$column.sortable(this)]==\'asc\', \'sort-desc\': params.sorting()[$column.sortable(this)]==\'desc\' }" ng-click="sortBy($column, $event)" ng-if="$column.show(this)" ng-init="template=$column.headerTemplateURL(this)" class="header {{$column.class(this)}}"> <div ng-if="!template" class="ng-table-header" ng-class="{\'sort-indicator\': params.settings().sortingIndicator==\'div\'}"> <span ng-bind="$column.title(this)" ng-class="{\'sort-indicator\': params.settings().sortingIndicator==\'span\'}"></span> <i ng-if="$column.headerTitle(this)" data-toggle="tooltip" data-placement="top" title="{{$column.headerTitle(this)}}" class="glyphicon glyphicon-info-sign"></i> </div> <div ng-if="template" ng-include="template"></div> </th> </tr>');
}]);