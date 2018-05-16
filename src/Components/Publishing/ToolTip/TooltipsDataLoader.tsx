import React, { Component } from "react"
import PropTypes from "prop-types"
import { QueryRenderer, graphql } from "react-relay"
import { ArticleData } from "../Typings"
import { ArticleProps } from "../Article"
import { getArtsySlugsFromArticle } from "../Constants"
import { keyBy } from "lodash"
import { TooltipsDataLoaderQueryResponse } from "../../../__generated__/TooltipsDataLoaderQuery.graphql"
import * as Artsy from "../../Artsy"

interface Props extends Artsy.ContextProps {
  article: ArticleData
  shouldFetchData?: boolean
  onOpenAuthModal?: ArticleProps["onOpenAuthModal"]
}

export class TooltipsDataLoader extends Component<Props> {
  static defaultProps = {
    shouldFetchData: true,
  }

  render() {
    const {
      article,
      children,
      currentUser,
      relayEnvironment,
      shouldFetchData,
      onOpenAuthModal,
    } = this.props

    const { artists: artistSlugs, genes: geneSlugs } = getArtsySlugsFromArticle(
      article
    )

    if (!shouldFetchData) {
      return children
    }

    return (
      <QueryRenderer
        environment={relayEnvironment}
        query={graphql`
          query TooltipsDataLoaderQuery(
            $artistSlugs: [String!]
            $geneSlugs: [String!]
          ) {
            artists(slugs: $artistSlugs) {
              id
              ...ArtistToolTip_artist
              ...FollowArtistButton_artist
            }
            genes(slugs: $geneSlugs) {
              id
              ...GeneToolTip_gene
              ...FollowGeneButton_gene
            }
          }
        `}
        variables={{
          artistSlugs,
          geneSlugs,
        }}
        render={readyState => {
          const data: TooltipsDataLoaderQueryResponse = {
            artists: [],
            genes: [],
          }
          Object.keys(readyState.props || {}).forEach(key => {
            const col = readyState.props[key]
            data[key] = keyBy(col, "id")
          })
          return (
            <TooltipsContextProvider
              {...data}
              currentUser={currentUser}
              onOpenAuthModal={onOpenAuthModal}
            >
              {children}
            </TooltipsContextProvider>
          )
        }}
      />
    )
  }
}

class TooltipsContextProvider extends Component<any> {
  static childContextTypes = {
    tooltipsData: PropTypes.object,
    currentUser: PropTypes.object,
    onOpenAuthModal: PropTypes.func,
    activeToolTip: PropTypes.any,
    onOpenToolTip: PropTypes.func,
  }

  state = {
    activeToolTip: null,
  }

  onOpenToolTip = activeToolTip => {
    if (activeToolTip !== this.state.activeToolTip) {
      this.setState({ activeToolTip })
    }
  }

  getChildContext() {
    const { artists, currentUser, genes, onOpenAuthModal } = this.props
    const { activeToolTip } = this.state

    return {
      tooltipsData: {
        artists,
        genes,
      },
      currentUser,
      onOpenAuthModal,
      activeToolTip,
      onOpenToolTip: this.onOpenToolTip,
    }
  }

  render() {
    return this.props.children
  }
}

export const TooltipsData = Artsy.ContextConsumer(TooltipsDataLoader)
