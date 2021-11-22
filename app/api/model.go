package main

import (
	"fmt"
)

type (
	GetRepositoriesInput struct {
		Labels         []string `query:"labels"`
		Assigned       *bool    `query:"assigned"`
		Language       string   `query:"language"`
		StarCountLower *uint    `query:"star_count_lower"`
		StarCountUpper *uint    `query:"star_count_upper"`
		ForkCountLower *uint    `query:"fork_count_lower"`
		ForkCountUpper *uint    `query:"fork_count_upper"`
		License        string   `query:"license"`
	}

	GetRepositoryIssue struct {
		URL            string
		AssigneesCount uint
		Labels         []string
	}

	GetRepository struct {
		Name           string
		URL            string
		Description    string
		StarCount      uint
		ForkCount      uint
		OpenIssueCount uint
		Topics         string
		License        string
		Language       string
		Issues         []GetRepositoryIssue
	}

	GetRepositoriesOutput []GetRepository

	GetLanguagesOutput []string

	GetLicensesOutput []string

	GetLabelsOutput []string
)

func (input *GetRepositoriesInput) validator() error {
	if input.StarCountLower != nil && input.StarCountUpper != nil && *input.StarCountLower > *input.StarCountUpper {
		return fmt.Errorf("star_count_lower should be less than star_count_upper")
	}
	if input.ForkCountLower != nil && input.ForkCountUpper != nil && *input.ForkCountLower > *input.ForkCountUpper {
		return fmt.Errorf("fork_count_lower should be less than fork_count_upper")
	}
	return nil
}
