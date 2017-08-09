// only if there has been a courseid passed in do we bother trying to get the students
if ($routeParams && $routeParams.courseid) {
    getStudents($routeParams.courseid);
}

/**
 * Shows the edit window and positions it based on the row clicked on.
 *
 * @param {object} $event
 * @param {object} student
 * @returns {null}
 */
$scope.showEditStudent = function ($event, student, editorID) {
    var element = $event.currentTarget,
        padding = 22,
        posY = (element.offsetTop + element.clientTop + padding) - (element.scrollTop + element.clientTop),
        studentEditorElement = document.getElementById(editorID);

    console.log(student);
    $scope.selectedStudent = angular.copy(student);
    $scope.editorVisible = true;

    studentEditorElement.style.position = 'absolute';
    studentEditorElement.style.top = posY + 'px';
};
